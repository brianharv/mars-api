import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';
import { MarsService } from './mars-service.js'

function clearFields() {
    $('#date').val("");
    $('.showError').val("");
    $('.imageTitle').val("");
    $('.showPhoto').empty();
    $('.showVideo').empty();
    $('.showText').val("");
    $('.showExp').val("");
}

$(document).ready(function() { 
  $('#form').submit(function(event) {
    event.preventDefault();
    let date = $('#date').val();
    console.log(date);
    clearFields();
    let promise = MarsService.getPhoto(date);
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.imageTitle').text(`${body.title}`);
        if (body.media_type === "image") {
          $('.showPhoto').html(`<img src=${body.url}>`);
        } else $('.showVideo').html(`<iframe width="420" height="315" src=${body.url}></iframe>`)  
      $('.showText').text(`Image date: ${body.date}`);
      $('.showExp').text(`${body.explanation}`);
      console.log(body);
    }, function(error) {
      $('.showError').text(`There was an error processing your request: ${error}`);
    });
  });
});