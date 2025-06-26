---

date: '{{ .Date }}'

draft: true

title: '{{ replace .File.ContentBaseName "-" " " | title }}'

lang: "fa"

translationKey: '{{ .File.BaseFileName }}'

images:

- thumbnail.webp

cover:

image: "thumbnail.webp"

alt: "نمونه تصویر کاور"

caption: "این یک کپشن برای تصویر است"

categories: []

tags: []

---