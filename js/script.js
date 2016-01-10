var feed = new Instafeed({
    get: 'user',
    userId: '2156602',
    accessToken: '2156602.f2beafa.46ba0be4b8f049fb82ddb1552e658e87',
    resolution: 'thumbnail',
    limit: 4,
    template: '<a href="{{link}}"><img class="instathumb" src="{{image}}" /></a>'
});
feed.run();