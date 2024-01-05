import os
import string
from fontTools import subset
from db_text import db_text_set
from vue_text import vue_text_set
from server_text import server_text_set

union_text_set = db_text_set.union(vue_text_set, server_text_set)
union_text_set.update(map(str, range(1, 10)))
union_text_set.update(string.ascii_lowercase)
union_text_set.update(string.ascii_uppercase)


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONT_PATH = os.path.join(SCRIPT_DIR, "./TsangerYuYangT.ttf")
OUTPUT_PATH = os.path.join(SCRIPT_DIR, "../public/TsangerYuYangT-subset.ttf")

def create_subset_font(font_path, output_path, characters):
    options = subset.Options()
    font = subset.load_font(font_path, options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text="".join(characters))
    subsetter.subset(font)
    font.save(output_path)


def main():
    create_subset_font(FONT_PATH, OUTPUT_PATH, union_text_set)

if __name__ == "__main__":
    main()