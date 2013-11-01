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
      var img = document.createElement('img');
      var frmt = document.createElement('div');
      var img_id = gifs[i].id;
      frmt.setAttribute('id',"_"+img_id);
      img.src = "http://i.imgur.com/"
        + img_id +
        "s.gif";
      img.setAttribute('alt', gifs[i].title);
      img.setAttribute('id', img_id);
      frmt.onmouseover = function (){
	var req2 = new XMLHttpRequest();
	req2.open ("GET", 'https://api.imgur.com/3/image/' + this.firstChild.id);
	req2.onload = function () {
	  var img_data = JSON.parse(req2.responseText).data;
	  var img_y = (img_data.width * (90 / img_data.height));
	  var img_x = 90;
	  var target = '#' + img_data.id
	  //throw new Error(target);
	  $(target).attr('style',"height: " + img_x + "px; width: " + img_y +"px; position: relative; left: -"+((img_y-90)/2) + "px; overflow-x: hidden;");
	  $(target).attr('src', "http://i.imgur.com/" + img_data.id + ".gif");  
	}  
	req2.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f"); 
        req2.send(null);
      };
      frmt.onmouseout = function (){this.firstChild.src = "http://i.imgur.com/" + this.firstChild.id + "s.gif"
	this.firstChild.setAttribute('style', "width: 90px")
	this.setAttribute('style',"border: 1px solid white;");};
      frmt.onclick = function (){
	this.setAttribute('style', "-webkit-animation-play-state: running;");
	var sandbox = $('#sandbox').val("http://i.imgur.com/" + this.firstChild.id + ".gif").select();
        sandbox.display="visible";
	document.execCommand('copy');
	sandbox.display = "hidden";
      };
      /*img.onclick = function () {
	document.body.innerHTML = document.body.innerHTML + '<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>'
document.getElementById("shortlink").select()
document.execCommand("Copy")
document.body.innerHTML.replace('<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>', '') };*/
      frmt.appendChild(img);
      document.body.appendChild(frmt);}
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
