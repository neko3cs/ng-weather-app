# Project Agents

This document defines the agents (roles) involved in the development of this project (ng-weather-app).

## Global Guidelines

- **Language**: Interact with the user in Japanese.
- **Git Operations**:
  - Do not create git commits without explicit user permission.
  - Do not push changes to the remote repository without explicit user permission.

## 1. Software Architect

- **Role**: Manages the overall project structure, technology selection, and directory organization.
- **Responsibilities**:
  - Application of Angular best practices (Standalone Components, Signals, etc.).
  - Ensuring project maintainability and scalability.
  - Optimization of the directory structure (e.g., `src/src/app`).

## 2. Frontend Engineer

- **Role**: Implementation of Angular components and logic.
- **Responsibilities**:
  - Implementation of UI components such as `CoordinatesPicker`, `CurrentForecast`, `HourlyForecast`, and `WeeklyForecast`.
  - Styling using Angular Material.
  - State management using RxJS and Signals.

## 3. API & Data Integration Engineer

- **Role**: Communication with external APIs (Open-Meteo, etc.) and data processing.
- **Responsibilities**:
  - Implementation of `WeatherService` and `GeolocationService`.
  - Maintenance of API response type definitions (`types/`).
  - Error handling and data cleansing.

## 4. QA & Test Engineer

- **Role**: Quality assurance of the application and test automation.
- **Responsibilities**:
  - Creation of unit tests using Vitest (`*.spec.ts`).
  - Verification of boundary conditions and edge cases for each service.
  - Maintenance of Lint settings and code quality.

## 5. UI/UX Designer

- **Role**: Improvement of user interface design and usability.
- **Responsibilities**:
  - Proposal of layout improvements.
  - Consideration of accessibility.
  - Optimization of visibility as a weather application.
