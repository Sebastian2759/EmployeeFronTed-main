import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { NgModule } from '@angular/core';


const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;