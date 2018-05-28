# sift

**Sift** is a web application that helps home cooks find better recipes. 

## Why? 

The internet is replete with recipes and recipe websites. In fact I think there are actually too many options. A typical search can yield hundreds of results, and it's not immediately clear which recipes are great and which are just ok. In this situation I find myself returning to the same blogs and sites that consistently deliver good recipes. In light of this, I wanted a tool that allows me to search for results across many sites, and then filter to show only the results from the websites I know and can rely on. 

## How it works. 

### Recipe Search

Users type in a search term and hit search. Upon returning the results, a row of filters shows up below the search bar. Users can select one or more of these filters to adjust the results they see. Results are displayed as cards, which show an image of the recipe, a link to its origin, the name of the origin with a button for adding the site to the user's favorites, and a "+" button for adding the recipe to a collection. 

### Favorite Sources

Each result card shows the recipe's origin and a heart button for adding the site to their favorites. Simply click to add to the favorites list. Users can review their list of favorites in their profile, and optionally remove any they no longer want. Additionally, users can perform a recipe search from just their favorite sites by clicking the dropdown next to the search icon. 

### Collections

Users can create a new collection in their profile by clicking "Add New" in their "My Collections" section. Once users have created a collection they can add a recipe to it from search results by clicking the "+" button on a result card. The user will be asked to select a collection and it is then added. Each collection has its own view, from which users can click the "+" button to add a recipe to another collection, or click "Edit" to remove any recipes they no longer want to save. 

### User Profile

The profile view allows users to see their favorite sites and collections at a glance. Users can edit their favorite sources list, and add/remove collections. Each collection also shows thumbnails of the three most recently added recipes. 

## Technologies involved.

* JavaScript - Vue.js framework, with vue-router and vuex
* Browserify + Vueify for bundling 
* Bootstrap
* HTML/CSS
* Firebase Auth
* Firebase realtime database
* Edamam recipe search API

## Future features

* Share recipes: Ability to send recipes to others, possibly via e-mail/text. 
