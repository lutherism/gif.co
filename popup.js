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
		$('.btn').click(function () {window.location='/selected.html'});
    var req = new XMLHttpRequest();
    req.open("GET", 'https://api.imgur.com/3/gallery/r/reactiongifs/top/1');
    req.onload = function () {
	    var gifs = JSON.parse(req.responseText).data;
	    for (var i = 0; i < gifs.length; i++) {
	      var imageHolder = document.createElement('div'); // imageHolder is img container
      var img2 = document.createElement('img');
				imageHolder.appendChild(img2);
	      document.body.appendChild(imageHolder);
	      var img_id = gifs[i].id;
				img2.id=img_id;
	      imageHolder.id = "_"+img_id;
				imageHolder.setAttribute('class','gif');
	      img2.src = "http://i.imgur.com/"+ img_id +"s.gif";
	      imageHolder.title = gifs[i].title;
	      imageHolder.onmouseover = function (){
        var req4 = new XMLHttpRequest();
        req4.open ("GET", 'https://api.imgur.com/3/image/' + this.firstChild.id);
        req4.onload = function () {
          var img_data2 = JSON.parse(req4.responseText).data;
          var img_y2 = (img_data2.width * (90 / img_data2.height));
          var img_x2 = 90;
          var target2 = '#' + img_data2.id
          //throw new Error(target);
          $(target2).attr('style',"height: " + img_x2 + "px; width: " + img_y2 +"px; position: relative; left: -"+((img_y2-90)/2) + "px; overflow-x: hidden;");
					$(target2).attr('src', "http://i.imgur.com/" + img_data2.id + ".gif");
        }
        req4.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f");
        req4.send(null);
	      };
	      imageHolder.onmouseout = function (){
          this.firstChild.src = "http://i.imgur.com/" + this.firstChild.id + "s.gif";
					$(this.firstChild).attr('style'," ");
	      };
	      imageHolder.onclick = function (){
		$(this).css('-webkit-animation-play-state', 'running');
		var sandbox = $('#sandbox').val("http://gif.openrobot.net/" + this.firstChild.id + ".gif").select();
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
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {  
gifGenerator.requestGifs();
});
