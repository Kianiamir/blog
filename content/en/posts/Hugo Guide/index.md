---
title: Setting Up Hugo - A Personal Guide
date: 2024-04-01
draft: false
lang: "en" #fa/en
translationKey: ""
cover:
  image: "thumbnail.webp"   # used as thumbnail/banner
  alt: "The cover of the post at Amir Kiani's website"
  #caption: "This is a caption under the image"
categories:
  - Web Development
  - Technology
tags:
  - Hugo
  - Web Development
---
Why am I spending time presenting this instruction? Because using the official wikis of Hugo and your theme of choice (PaperMod in my case) might not be as straightforward for beginners.

## Installation

I'm using macOS. For installation instructions on other operating systems, check the [Hugo installation page](https://gohugo.io/installation/).

To install Hugo on macOS, I use Homebrew:

```bash
brew install hugo
```

## Creating Your Site

I like my site to be stored in a directory called `blog`, but feel free to change the name as you wish:

```bash
hugo new site blog
```

Now that the directory is created, initiate a git repository in it:

```bash
cd blog
git init
```

## Choosing and Installing a Theme

Hugo is installed, and now you need a theme. Choose one by searching through the web; my choice is PaperMod. You'll need the GitHub link of the theme.

To create the site with a YAML configuration file (since PaperMod uses YAML):

```bash
hugo new site blog --format yaml
```

Note that if you follow the instructions in Hugo's official GitHub wiki, the config file will be generated as a TOML file instead of YAML. You have to force the usage of YAML because the sample files of the theme are in YAML format and using them is a good starting point.

To install the theme:

```bash
git submodule add --depth=1 https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

```bash
git submodule update --init --recursive # needed when you reclone your repo (submodules may not get cloned automatically)
```

```bash
git submodule update --remote --merge
```

Finally, set the theme as PaperMod in your site config. In `hugo.yml` add:

```yaml
theme: ["PaperMod"]
```

## Configuration

Here are the sample configurations to be added to `hugo.yml` for a quick start:

```yaml
baseURL: "https://examplesite.com/"
title: ExampleSite
paginate: 5
theme: PaperMod

enableRobotsTXT: true
buildDrafts: false
buildFuture: false
buildExpired: false

minify:
  disableXML: true
  minifyOutput: true

params:
  env: production # to enable google analytics, opengraph, twitter-cards and schema.
  title: ExampleSite
  description: "ExampleSite description"
  keywords: [Blog, Portfolio, PaperMod]
  author: Me
  # author: ["Me", "You"] # multiple authors
  images: ["<link or path of image for opengraph, twitter-cards>"]
  DateFormat: "January 2, 2006"
  defaultTheme: auto # dark, light
  disableThemeToggle: false

  ShowReadingTime: true
  ShowShareButtons: true
  ShowPostNavLinks: true
  ShowBreadCrumbs: true
  ShowCodeCopyButtons: false
  ShowWordCount: true
  ShowRssButtonInSectionTermList: true
  UseHugoToc: true
  disableSpecial1stPost: false
  disableScrollToTop: false
  comments: false
  hidemeta: false
  hideSummary: false
  showtoc: false
  tocopen: false

  assets:
    # disableHLJS: true # to disable highlight.js
    # disableFingerprinting: true
    favicon: "<link / abs url>"
    favicon16x16: "<link / abs url>"
    favicon32x32: "<link / abs url>"
    apple_touch_icon: "<link / abs url>"
    safari_pinned_tab: "<link / abs url>"

  label:
    text: "Home"
    icon: /apple-touch-icon.png
    iconHeight: 35

  # profile-mode
  profileMode:
    enabled: false # needs to be explicitly set
    title: ExampleSite
    subtitle: "This is subtitle"
    imageUrl: "<img location>"
    imageWidth: 120
    imageHeight: 120
    imageTitle: my image
    buttons:
      - name: Posts
        url: posts
      - name: Tags
        url: tags

  # home-info mode
  homeInfoParams:
    Title: "Hi there 👋"
    Content: Welcome to my blog

  socialIcons:
    - name: x
      url: "https://x.com/"
    - name: stackoverflow
      url: "https://stackoverflow.com"
    - name: github
      url: "https://github.com/"

  analytics:
    google:
      SiteVerificationTag: "XYZabc"
    bing:
      SiteVerificationTag: "XYZabc"
    yandex:
      SiteVerificationTag: "XYZabc"

  cover:
    hidden: true # hide everywhere but not in structured data
    hiddenInList: true # hide on list pages and home
    hiddenInSingle: true # hide on single page

  editPost:
    URL: "https://github.com/<path_to_repo>/content"
    Text: "Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link

  # for search
  # https://fusejs.io/api/options.html
  fuseOpts:
    isCaseSensitive: false
    shouldSort: true
    location: 0
    distance: 1000
    threshold: 0.4
    minMatchCharLength: 0
    limit: 10 # refer: https://www.fusejs.io/api/methods.html#search
    keys: ["title", "permalink", "summary", "content"]

menu:
  main:
    - identifier: categories
      name: categories
      url: /categories/
      weight: 10
    - identifier: tags
      name: tags
      url: /tags/
      weight: 20
    - identifier: example
      name: example.org
      url: https://example.org
      weight: 30

pygmentsUseClasses: true
markup:
  highlight:
    noClasses: false
    # anchorLineNos: true
    # codeFences: true
    # guessSyntax: true
    # lineNos: true
    # style: monokai
```

## Running Your Site Locally

Now everything is set up. You can run your website locally and check the blank index page. In the terminal:

```bash
hugo server
```

Then open this link in your browser:

```text
localhost:1313
```

## Adding Content

To add posts, you can add `.md` files to the content directory or simply use this command as suggested by the official Hugo wiki:

```bash
hugo new content/posts/my-first-post.md
```

But before doing so, I highly suggest checking the archetype folder and the `default.md` file. One issue I noticed is that the default header for new content is in TOML while we forced the site to use YAML universally. This might not necessarily cause problems, but I prefer consistency throughout the files. My `default.md` file was like this:

```toml
+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
+++
```

I changed it to this:

```yaml
---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: {{ .Date }}
draft: true
---
```

Now you are more than ready to create new content:

```bash
hugo new content/posts/my-first-post.md
```

At this point, you have a fully functional site that works fine locally. For the next steps, you can host it on a server to make it accessible to everyone. Happy blogging!


## Good References:
1. https://jessewei.dev/blog/2023/papermod/#single-1