# lastfm-tag-cloud
A last.fm tag cloud generator built with Vue!

Give it a whirl: [theteacat.github.io/lastfm-tag-cloud/](https://theteacat.github.io/lastfm-tag-cloud/)

## How are the tags chosen & scaled?

Initially, the sample of artists (up to the size and of the time period you specify) is iterated through. For each artist, their top tags are fetched, using [artist.getTopTags](https://www.last.fm/api/show/artist.getTopTags). 

Each tag in the response has a `count` for that artist.

>**Note:** This `count` doesn't seem to be documented anywhere. They cap out at 100, so I am working under the assumption that they're a kind of confidence % as to how apropriate that tag is for that artist.

For each tag on the artist, the tag's `count` is added to that tag's `library_total` metric.

This `library_total` metric is created with an initial value of `0` for every tag.

Once all of the artists are iterated through, the tags are pruned to the top 100 by this `library_total` metric. This is done to avoid hitting rate limits on the last.fm API in the next step, where I have to call [tag.getInfo](https://www.last.fm/api/show/tag.getInfo) for every tag.

Each of these 100 tags is then scored as per the following code snippet [[source](https://github.com/TheTeaCat/lastfm-tag-cloud/blob/master/src/assets/js/Generator.js)]:

```javascript
score_tags(result){
    for (var tag of result.tags) {
        result.scores[tag] = 0
        /**First, each tagging is weighted by the product of:
         *  - How many times the user has listened to the artist on which the tag was used,
         * and...
         *  - The "count" of that tag on the artist.
         *    I am assuming that this "count" is a confidence % given by last.fm as to the accuracy of the tag on that artist.
         *    I can't find any doccumentation, but this would make sense, as they cap out at 100.
         */
        for (var tagging of result.taggings[tag]) {
            result.scores[tag] += tagging.count/100 * result.listens[tagging.artist]
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
        result.scores[tag] = result.scores[tag] 
                                    * (result.tag_meta[tag].library_total / result.tag_meta[tag].total) 
                                    * result.taggings[tag].length * result.taggings[tag].length
                                    * Math.log10(result.tag_meta[tag].reach)
    }
}
```

I've tried to make this take into account the "uniqueness" of the tag to a user's library, as if they were all just scored by frequency the biggest tag on everyone's clouds would probably just be "all".

If this causes issues for you, I know. See [here](https://github.com/TheTeaCat/lastfm-tag-cloud/issues/10). I don't care. :rowboat:

## Acknowledgements

I'm using [timdream's word cloud generator](https://github.com/timdream/wordcloud2.js/).
