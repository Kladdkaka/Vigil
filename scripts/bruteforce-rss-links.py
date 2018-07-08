import sys
import requests

# lmao this code is so spaghetti, do not judge, it still works ;-)

lines = [
    line.translate(dict.fromkeys(range(33)))
    for line in sys.stdin.readlines()
]

domains = list(filter(None, lines))

prefixes = [
    'https://',
    'http://'
]

suffixes = [
    '/rss',
    '/feed'
]


def url_generator():
    for domain in domains:
        for prefix in prefixes:
            for suffix in suffixes:
                yield domain, f'{prefix}{domain}{suffix}'


working = {}

for domain, url in url_generator():
    print(url)

    if domain in working:
        continue

    try:
        r = requests.get(url)

        print(r.headers)
        print(r.headers['Content-Type'])

        if 'rss' in r.headers['Content-Type'] or 'xml' in r.headers['Content-Type']:
            working[domain] = url

    except Exception as e:
        print(domain, e)

print(working)
