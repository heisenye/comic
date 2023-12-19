import os
import re

project_dir = os.path.dirname(__file__)
src_dir = os.path.abspath(os.path.join(project_dir,os.pardir, 'src'))

vue_text_set = set()

text_pattern = re.compile(r'[\u4e00-\u9fa5]')

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".vue") or file.endswith(".js"):
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                content = f.read()
                matches = text_pattern.findall(content)

                if matches:
                    for match in matches:
                        vue_text_set.add(match)


