import requests
import operator
import json
from ftfy import fix_text
import subprocess
import sys
from fuzzywuzzy import process
import os
import pickle
from functools import wraps


def memoize(func):
    if os.path.exists(f'{sys.path[0]}\\memoize.pkl'):
        print('reading cache file')
        with open(f'{sys.path[0]}\\memoize.pkl', 'rb') as f:
            cache = pickle.load(f)
    else:
        cache = {}

    @wraps(func)
    def wrap(*args):
        if args not in cache:
            print('Running func')
            cache[args] = func(*args)
            # update the cache file
            with open(f'{sys.path[0]}\\memoize.pkl', 'wb') as f:
                pickle.dump(cache, f)
        else:
            print('result in cache')
        return cache[args]
    return wrap


@memoize
def get_newspaper_names():
    r = requests.get('https://tidningar.kb.se/api/json?q=*')

    data = json.loads(r.content.decode('utf8'))

    newspapers = list(
        map(operator.itemgetter('key'),
            data['aggregations']['newspaper_title_facet']['buckets'])
    )  # lol why did i not use list comprehension

    newspapers = [fix_text(newspaper) for newspaper in newspapers]

    return newspapers


def get_provider_names():

    script_path = sys.path[0].replace('\\', '/') + '/'

    script = f'''
    const providers = require("{script_path}../providers")

    process.stdout.write(
      JSON.stringify(Object.values(providers).map(provider => provider.provider))
    )
    '''

    # do not even ask this is so terrible

    provider_names = json.loads(
        subprocess.check_output(
            ['node', '-e', script]
        ).decode('utf-8')
    )

    return provider_names


def lower_list(l):
    return [item.lower() for item in l]


def normalizish_list(l):
    return [item.translate(str.maketrans('', '', '- ')) for item in l]


kb_names = normalizish_list(lower_list(get_newspaper_names()))
p_names = normalizish_list(lower_list(get_provider_names()))

# print(kb_names, p_names)

print('kb len:', len(kb_names))
print('p len:', len(p_names))


direct_matches = []

for kb_name in kb_names[:]:
    if kb_name in p_names:
        direct_matches.append(kb_name)
        kb_names.remove(kb_name)
        p_names.remove(kb_name)

print('direct:', ', '.join(direct_matches))

print('kb len:', len(kb_names))
print('p len:', len(p_names))

s = []

for kb_name in kb_names[:]:
    res_name, perc = process.extractOne(kb_name, p_names)

    s.append((f'{kb_name} ~ {res_name} | {perc}%', perc))

for txt in sorted(s, key=operator.itemgetter(1)):
    print(txt[0])
    print()
