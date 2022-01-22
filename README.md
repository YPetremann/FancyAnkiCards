# [FancyAnkiCards](https://ypetremann.github.io/FancyAnkiCards/)

Fancy Anki Cards

[Javascript](src/FancyAnkiCards.js) | [Styles](src/FancyAnkiCards.css)

**Front:**

```html
<!-- Every cards needs this -->
<script src="https://ypetremann.github.io/FancyAnkiCards/src/FancyAnkiCards.js"></script>

<!-- You can add this to add breadcrumb and tags -->
<nav class="breadcrumb">{{Deck}}</nav>
<nav class="tags">{{Tags}}</nav>

<!-- Question need to be in header -->
<header>{{Front}}</header>

<!-- You can add something here -->
<footer>{{type:Back}}</footer>
-->
```

**Back:**

```html
<!-- Load rest of the card -->
{{FrontSide}}
<!-- Answer need to be in footer -->
<footer>{{Back}}</footer>
```
