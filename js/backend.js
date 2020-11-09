"use strict";

(function () {
  var URL = "https://javascript.pages.academy/keksobooking/data";
  var UPURL = "https://javascript.pages.academy/keksobooking";

  var StatusCode = {
    OK: 200,
  };
  var TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      window.loadResult = xhr.response;
      if (xhr.status === StatusCode.OK) {
        onSuccess(window.loadResult);
      } else {
        onError("Статус ответа: " + xhr.status + " " + xhr.statusText);
      }
    });
    xhr.addEventListener("error", function () {
      onError("Произошла ошибка соединения");
    });
    xhr.addEventListener("timeout", function () {
      onError("Запрос не успел выполниться за " + xhr.timeout + "мс");
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open("GET", URL);
    xhr.send();
  };

  var errorMap = {
    400: "Ошибка 400: Плохой запрос",
    403: "Ошибка 403: Запрещено",
    404: "Ошибка 404: Не найден",
    500: "Ошибка 500: Внутренняя ошибка сервера",
    502: "Ошибка 502: Плохой шлюз",
    503: "Ошибка 503: Сервис недоступен",
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case StatusCode.BAD_REQUEST:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.FORBIDDEN:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.NOT_FOUND:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.INTERNAL_SERVER_ERROR:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.BAD_GATEWAY:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.SERVICE_UNAVAILABLE:
            onError(errorMap[xhr.status]);
            break;
          default:
            onError("Cтатус ответа: : " + xhr.status + " " + xhr.statusText);
        }
      }
    });

    xhr.open("POST", UPURL);
    xhr.send(data);
  };
})();
