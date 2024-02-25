# lastfm-tag-cloud
A last.fm tag cloud generator built with Vue!

Give it a whirl: [https://tagcloud.rainosullivan.com/](https://tagcloud.rainosullivan.com/)

## How are the tags chosen & scaled?

A sample of your artists (up to the size and from the time period you specify) is taken from last.fm via the [user.getTopArtists](https://www.last.fm/api/show/user.getTopArtists) endpoint. For each artist, their top tags are fetched, using [artist.getTopTags](https://www.last.fm/api/show/artist.getTopTags). 

Each tag has a `count` on each artist that has a maximum value of 100. This `count` is a percentage of the people who have tagged that artist that tagged it this tag (e.g. if one person tags an artist "Lo-Fi", and a hundred people tag that artist, then "Lo-Fi" would have a `count` of 1 on that artist.).

Consider the following three example artists, with the following three sample tags and their corresponding counts on each artist:

| Artist      | Scrobbles | Tag 1: Count   | Tag 2: Count   | Tag 3: Count  |
| ----------- | --------- | -------------- | -------------- | ------------- |
| Tennis      | 2019      | Lo-Fi: 100     | Indie Pop: 100 | Chillwave: 70 |
| Men I Trust | 1330      | Dream Pop: 100 | Indie: 67      | Indie Pop: 60 |
| Thundercat  | 700       | Funk: 100      | Electronic: 91 | Jazz: 74      |

Before we move on, the sum of each tag's `count` over all the artists in your sample is calculated, and used as a razor - only up to the top 100 tags by this metric are kept, the rest are discarded to avoid reaching the last.fm API's rate limits.

Two metrics are then taken about each tag from last.fm using the [tag.getInfo](https://www.last.fm/api/show/tag.getInfo) endpoint: the tag's `reach`, which is defined as the number of users who have used the tag; and the tag's `total` (last.fm call this `taggings` in their docs but it's labelled as `total` in the actual data???), which is the total amount of times the tag has been used over all artists on last.fm.

Here are some `reach` and `total`/`taggings` values for the tags used above:

| Tag        | Reach  | Total/Taggings |
| ---------- | ------ | -------------- |
| Lo-Fi      | 32892  | 160851         |
| Indie Pop  | 64939  | 367857         |
| Chillwave  | 7922   | 31368          |
| Dream Pop  | 24113  | 118911         |
| Indie      | 253595 | 2017702        |
| Funk       | 82092  | 422156         |
| Electronic | 254177 | 2372062        |
| Jazz       | 146580 | 1150923        |

Now we have all the data, we can start using it.

A `score` is created for each tag as the sum of the products of the scores of the tag (divided by 100) on each artist, and your scrobbles of that artist. For example, "Indie Pop" from the example above would have a `score` of `(100/100 * 2019) + (60/100 * 1330) = 2541.4`.

This `score` of each tag is then scaled (multiplied) by: 

- The sum of the `count` of that tag on the artists in your sample, divided by the `total` of that tag from the `tag.getInfo` endpoint (this is intended to capture how much of the total uses of that tag fall within your sample).
- The number of artists within your sample that are tagged that tag, squared.
- The base-10 logarithm of the `reach` of that tag from the `tag.getInfo` endpoint (so, a tag gets twice as big for every factor of 10 people that use it - 1 would be half the size of 10, 10 half the size of 100, 100 of 1000...).

For "Indie Pop", this would be `2541.4 * ((100 + 60) / 367857) * 2^2 * log_10(64939) = ~21.28`.

This value is arbitrary, before it is passed to [timdream's word cloud generator](https://github.com/timdream/wordcloud2.js/) they're all scaled non-linearly to be in the range of 25-200. If you want to see exactly how this is done, check the CloudBox component's Mounted function. It's not that exciting.

I've tried to make this take into account the "uniqueness" of the tag to a user's library, as if they were all just scored by frequency the biggest tag on everyone's clouds would probably just be "all". If this causes issues for you, I know. See [here](https://github.com/TheTeaCat/lastfm-tag-cloud/issues/10). I don't care. :rowboat:

## What does the tag filter do?

The tag filter checks tags against an offensive word list, "all", "seen live" and a geohash filter to remove tags that are overly generic/obscene.

The source of the tag filter's offensive word list is [Ofcom's September 2016 Attitudes to potentially offensive language and gestures on TV and radio research report](https://www.ofcom.org.uk/__data/assets/pdf_file/0022/91624/OfcomOffensiveLanguage.pdf). Those used are the medium, strong, and stronger words that are **not** marked as "least recognised".

## Acknowledgements

I'm using [timdream's word cloud generator](https://github.com/timdream/wordcloud2.js/).
