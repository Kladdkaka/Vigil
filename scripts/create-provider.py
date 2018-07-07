import requests
import sys
import os
import xml.etree.ElementTree as ET

url = sys.argv[1]

root = ET.fromstring(
    requests.get(url).text
)

title = root.find('./channel/title').text
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
