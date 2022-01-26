let arrayname = [{
    kind: 'youtube#searchResult',
    etag: '5R6LYonDqk12aBrVnE3AETYhqdA',
    id: { kind: 'youtube#video', videoId: 'EE44iJjgn48' },
    snippet: {
        publishedAt: '2018-11-24T02:19:20Z',
        channelId: 'UCwgUaZOX8wqYgzU4aXscRvw',
        title: 'FB LIVE- 5 Steps to Overcoming Postpartum Depression and Anxiety with a Special Bonus',
        description: 'Sign up for a Free One on One Consultation with me here:https://calendly.com/amybolton/50min.',
        thumbnails: [Object],
        channelTitle: 'Amy Bolton',
        liveBroadcastContent: 'none',
        publishTime: '2018-11-24T02:19:20Z'
    }
}]

// console.log(arrayname[0].snippet)
console.log(arrayname[0].snippet.title)