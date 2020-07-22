# [FancyAnkiCards](https://ypetremann.github.io/FancyAnkiCards/)
Fancy Anki Cards

[Javascript](src/FancyAnkiCards.js) | [Styles](src/FancyAnkiCards.css)

{% raw %}

**Recto:**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
<script src="https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.js"></script>

<nav class="breadcrumb">{{Deck}}</nav>
<nav class="tags">{{Tags}}</nav>

<!-- Start edit your template here -->
<header>{{Recto}}</header>

<!-- Optionnaly add footer for Recto -->
<!--
<footer>{{type:Verso}}</footer>
-->
```

**Style:**
```css
@import url("https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.css");
```

**Verso:**
```html
{{FrontSide}}
<footer>{{Verso}}</footer>
```
{% endraw %}
