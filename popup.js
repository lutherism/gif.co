// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
//var SUBREDDIT = 'reactiongifs';


var gifGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  // subredditonImgur_: 'https://api.imgur.com/3/' +
  //    'gallery/r/' +
  //    encodeURIComponent(SUBREDDIT) +
  //    "/hot/1",

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestGifs: function() {
    var req = new XMLHttpRequest();
    req.open("GET", 'https://api.imgur.com/3/gallery/r/reactiongifs/top/1');
    req.onload = function () {
	    var gifs = JSON.parse(req.responseText).data;
	    for (var i = 0; i < gifs.length; i++) {
	      var imageHolder = document.createElement('div'); // imageHolder is img container
	      document.body.appendChild(imageHolder);
	      var img_id = gifs[i].id;
	      imageHolder.id = img_id;
	      $(imageHolder).css('background-image', 'url("http://i.imgur.com/'+ img_id +'s.gif")');
	      imageHolder.title = gifs[i].title;
	      imageHolder.onmouseover = function (){
		$(this).css('background-image', 'url("http://i.imgur.com/'+ this.id +'.gif")');
	      };
	      imageHolder.onmouseout = function (){
		$(this).css('background-image', 'url("http://i.imgur.com/'+ this.id +'s.gif")');
	      };
	      imageHolder.onclick = function (){
		$(this).css('-webkit-animation-play-state', 'running');
		var sandbox = $('#sandbox').val("http://gif.openrobot.net/" + this.id + ".gif").select();
		sandbox.display="visible";
		document.execCommand('copy');
		sandbox.display = "hidden";
	      };
	      document.body.appendChild(imageHolder);
	    }
    }
    req.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f");
    req.send("reactiongifs");
  }

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  /*showPhotos_: function (e) {
    document.body.innerHTML = document.body.InnerHTML + e.responseText;
    var gifs = JSON.parse(e.responseText).data.images;
    for (var i = 0; i < 20; i++) {
      var img = document.createElement('img');
      img.src = this.constructGifsURL_(gifs[i]);
      img.setAttribute('alt', gifs[i].title);
      document.body.appendChild(img);
      document.body.innerHTML = document.body.innerHTML + "tested";
    }
  },*/

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  /*constructGifsURL_: function (photo) {
    return "http://i.imgur.com/"
        + photo.id +
        "s.gif";
  }*/
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {  
gifGenerator.requestGifs();
});
