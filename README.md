<h1 align="center">Проект бекенд Movies (Express)</h1>
<p align="center">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/bezprobeloff/movies-explorer-api" />
    <img alt="Quality" src="https://img.shields.io/badge/status-release-orange.svg" >
    <img alt="Made by: Bezprobeloff" src="https://img.shields.io/badge/made%20by-Bezprobeloff-blue" />
</p>

## Обзор

Исходный код фронтенда  на GitHub -  **[Movies (frontend)](https://github.com/bezprobeloff/movies-explorer-frontend)**  

## Роуты

| Роут | Запрос | Действие | Ошибки |
| --- | --- | --- | --- |
| `/singup` | POST | Регистрация. POST-запрос создаёт пользователя с переданными в теле запроса | 400 — Переданы некорректные данные при создании пользователя. 500 — Ошибка по умолчанию. |
| `/signin` |  POST | Авторизация. | 400 — Переданы некорректные данные при авторизации пользователя. 500 — Ошибка по умолчанию. |
| `/users/me` | PATCH | PATCH-запрос обновляет информацию о пользователе. | 400 — Переданы некорректные данные при обновлении профиля. 404 — Пользователь с указанным _id не найден. 500 — Ошибка по умолчанию. |
| `/movies` | GET POST | GET-запрос возвращает все карточки из базы данных. POST-запрос создает новую карточку по переданным параметрам. | 400 — Переданы некорректные данные при создании карточки. 500 — Ошибка по умолчанию. |
| `/movies/:movieId` | DELETE | DELETE-запрос удаляет карточку по _id. | 404 — Карточка с указанным _id не найдена. |

## Технологии

* express
* celebrate
* joi
* mongoose
* validator
* jsonwebtoken
* express-winston
* централизованная обработка ошибок

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  
`/middlewares` — папка с файлами промежуточных функций  
`/errors` — папка с файлами кастомных ошибок

## Установка

Установить Node.js (v16.5) и запустить в корневом каталоге проекта:

`npm install` — установка пакетов   

## Запуск проекта

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload
