<template>
    <p>Tags on your artists:
        <br><br>
        <ol id="tags-list">
            <li v-for='tag in tags' v-bind:tag='tag'>{{ tag }}:
                <ol class="taggings-list">
                    <li v-for='tagging in taggings[tag]'>{{ tagging.artist }}</li>
                </ol>
            </li>
        </ol>
    </p>
</template>

<script>
    export default {
        props: ['tags','taggings']
    }
</script>