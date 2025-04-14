// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // This is your Spring Boot backend
});

export default API;
