# lastfm-tag-cloud
A last.fm tag cloud generator build on Vue!

Give it a whirl: [theteacat.github.io/lastfm-tag-cloud/](https://theteacat.github.io/lastfm-tag-cloud/)

## How are the tags chosen & scaled?

Initially, the sample of artists (up to the size and of the time period you specify) is iterated through. For each artist, their top tags are fetched, using [artist.getTopTags](https://www.last.fm/api/show/artist.getTopTags). 

Each tag in the response has a `count`, and each tag has a `library_total` metric initialised at `0`.

This `count` doesn't seem to be documented anywhere. They cap out at 100, so I am working under the assumption that they're a kind of confidence % as to how apropriate that tag is for that artist.

For each tag on the artist, the product of `the tag's score on that artist` and `the user's scrobbles of that artist` is added to the tag's `library_total` metric.

Once all of the artists are iterated through, the tags are pruned to the top 100 by this `library_total` metric. This is done to avoid hitting rate limits on the last.fm API.

They are then scored, which will determine their size.

Behold, the relevant code [[source](https://github.com/TheTeaCat/lastfm-tag-cloud/blob/master/src/assets/js/Generator.js)]:

```javascript
score_tags(){
    for (var tag of this.result.tags) {
        this.result.scores[tag] = 0
        /**First, each tagging is weighted by the product of:
         *  - How many times the user has listened to the artist on which the tag was used,
         * and...
         *  - The "count" of that tag on the artist.
         *    I am assuming that this "count" is a confidence % given by last.fm as to the accuracy of the tag on that artist.
         *    I can't find any doccumentation, but this would make sense, as they cap out at 100.
         */
        for (var tagging of this.result.taggings[tag]) {
            this.result.scores[tag] += tagging.count/100 * this.result.listens[tagging.artist]
        }
        /**The sum of all these weighted taggings is then scaled by:
         * 1. How many of the uses of that tag overall fall within the user's library sample (its "uniqueness" to the sample).
         * 
         * 2. How many artists within the sample are tagged with that tag (its "spread" over the sample).
         * 
         * 3. The base 10 logarithm of how many people have used that tag overall (its "reach"; see last.fm API docs).
         *    Base 10 is used so 100 people using the tag makes it twice as significant as 10 people using the tag; a nice balance.
         *    It's also conveniently provided as a function by Math.
         */
        this.result.scores[tag] = this.result.scores[tag] 
                                    * (this.result.tag_meta[tag].library_total / this.result.tag_meta[tag].total) 
                                    * this.result.taggings[tag].length * this.result.taggings[tag].length
                                    * Math.log10(this.result.tag_meta[tag].reach)
    }
}
```

:sob: If you don't like it, cry me a river. :sob:

:rowboat: <- me, rowing around in a sea of your tears. x

## Acknowledgements

I'm using [timdream's word cloud generator](https://github.com/timdream/wordcloud2.js/).
