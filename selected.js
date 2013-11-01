
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

  requestAlbums: function() {
    var req = new XMLHttpRequest();
    req.open("GET", 'https://api.imgur.com/3/account/reactiongifsarchive/albums');
    req.onload = function () {
    var albums = JSON.parse(req.responseText).data;
    //document.body.innerHTML = document.body.innerHTML + albums.length;
    for (var i = 0; i < albums.length; i++) {
      var img = document.createElement('img');
      var frmt = document.createElement('div');
      var img_id = albums[i].cover;
      frmt.setAttribute('id',"_"+img_id);
      img.src = "http://i.imgur.com/"
        + img_id +
        "s.gif";
      frmt.innerHTML = "<a style='z-index:2;position:absolute;opacity:.7;width: 94px;background-color:white;buffer:3px 3px;'>"+albums[i].title+"</a>";
    var back_link = document.createElement('a');
    back_link.href = '/selected.html';
    back_link.innerHTML = 'Selected Gifs';
      img.setAttribute('alt', albums[i].title);
      img.setAttribute('album', albums[i].id);
      img.setAttribute('id', albums[i].cover);
      frmt.onmouseover = function (){
        var req2 = new XMLHttpRequest();
        req2.open ("GET", 'https://api.imgur.com/3/image/' + this.lastChild.id);
        req2.onload = function () {
          var img_data = JSON.parse(req2.responseText).data;
          var img_y = (img_data.width * (90 / img_data.height));
          var img_x = 90;
          var target = "#"+img_data.id
          //throw new Error(target);
          $(target).attr('style',"height: " + img_x + "px; width: " + img_y +"px; position: relative; left: -"+((img_y-90)/2) + "px; overflow-x: hidden;");
          $(target).attr('src', "http://i.imgur.com/" + img_data.id + ".gif");
        }
        req2.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f");
        req2.send(null);
      };
      frmt.onmouseout = function (){this.lastChild.src = "http://i.imgur.com/" + this.lastChild.id + "s.gif"
        this.lastChild.setAttribute('style',this.lastChild.getAttribute('style')+ "width: 90px")
        this.setAttribute('style',"border: 1px solid white;");};
      frmt.onclick = function (){
	var album_id = this.lastChild.getAttribute('album');
      	//location.assign('selected.html');
	$("div").remove();
 	gifGenerator.requestGifs(album_id);	
      }
	/*img.onclick = function () {
        document.body.innerHTML = document.body.innerHTML + '<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>'
document.getElementById("shortlink").select()
document.execCommand("Copy")
document.body.innerHTML.replace('<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>', '') };*/
      frmt.appendChild(img);
      document.body.appendChild(frmt);}
    }
    req.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f");
    req.send(null);
  },


  requestGifs: function(api_url) {
    $('#01').prepend("<a href='/selected.html' style='display:block;width: 150x;'>Selected Gifs</a>");
    var req3 = new XMLHttpRequest();
    req3.open("GET", "https://api.imgur.com/3/album/" + api_url);
    req3.onload = function () {
    var gifs2 = JSON.parse(req3.responseText).data.images;
    //document.body.innerHTML = document.body.innerHTML + gifs2.length;
    //document.body.innerHTML = document.body.innerHTML + gifs.id;
    for (var f = 0; f < gifs2.length; f++) {
      var img2 = document.createElement('img');
      var frmt2 = document.createElement('div');
      var img_id2 = gifs2[f].id;
      frmt2.setAttribute('id',"_"+img_id2);
      img2.src = "http://i.imgur.com/"
        + img_id2 +
        "s.gif";
      img2.setAttribute('alt', gifs2[f].title);
      img2.setAttribute('id', img_id2);
      //throw new Error('e');
      frmt2.onmouseover = function (){
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
      frmt2.onmouseout = function (){this.firstChild.src = "http://i.imgur.com/" + this.firstChild.id + "s.gif"
        this.firstChild.setAttribute('style', "width: 90px")
        this.setAttribute('style',"border: 1px solid white;");};
      frmt2.onclick = function (){
        this.setAttribute('style', "-webkit-animation-play-state: running;");
        var sandbox2 = $('#sandbox').val("http://i.imgur.com/" + this.firstChild.id + ".gif").select();
        sandbox2.display="visible";
        document.execCommand('copy');
        sandbox2.display = "hidden";
      };
      /*img.onclick = function () {
        document.body.innerHTML = document.body.innerHTML + '<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>'
document.getElementById("shortlink").select()
document.execCommand("Copy")
document.body.innerHTML.replace('<p><a href="'+this.src+'" target="_blank" >'+this.src+'</a><form style="margin-top: -35px; margin-left: -500px;"><input type="text" id="shortlink" value="'+this.src+'"></form></p>', '') };*/
      frmt2.appendChild(img2);
      document.body.appendChild(frmt2);}
    }
    req3.setRequestHeader("Authorization", "Client-ID 82a5350b2318b8f");
    req3.send(null);
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
	gifGenerator.requestAlbums();
	});
