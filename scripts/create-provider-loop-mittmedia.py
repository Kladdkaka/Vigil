import requests
import sys
import os
from pyquery import PyQuery as pq

while True:
    url = input('input url or ctrl+c: ')

    try:
        print(url, url.replace('/feed', '').replace('/rss', ''))

        j = pq(
            requests.get(url.replace('/feed', '').replace('/rss', '')).text
        )

        title = j('span[itemprop="brand"]').text().replace(
            '&', 'och')  # correct?

        title_id = title.lower().translate(
            str.maketrans(
                ' åäö',
                '-aao'
            )
        )

        print(title, title_id)

        template = f'''
        const {{ RssScraper }} = require('../classes')

        module.exports = new RssScraper('{title}', '{url}')
        '''

        os.makedirs(sys.path[0] + '\\..\\temp', exist_ok=True)

        with open(sys.path[0] + '\\..\\temp\\' + title_id + '.js', 'w', encoding='utf-8') as f:
            f.write(template)
    except Exception as e:
        print(url, e)
