import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

interface Skill {
  name: string;
  iconPath: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  skills: Skill[] = [
    { name: 'React', iconPath: 'assets/icons/react.svg' },
    { name: 'Node.js', iconPath: 'assets/icons/nodejs.svg' },
    { name: 'NestJS', iconPath: 'assets/icons/nestjs.svg' },
    { name: 'Python', iconPath: 'assets/icons/python.svg' },
    { name: 'Flask', iconPath: 'assets/icons/flask.svg' },
    { name: 'Angular', iconPath: 'assets/icons/angular.svg' },
    { name: 'JavaScript', iconPath: 'assets/icons/javascript.svg' },
    { name: 'TypeScript', iconPath: 'assets/icons/typescript.svg' },
    { name: 'HTML5', iconPath: 'assets/icons/html.svg' },
    { name: 'CSS3', iconPath: 'assets/icons/css.svg' },
    { name: 'MongoDB', iconPath: 'assets/icons/mongodb.svg' },
    { name: 'MySQL', iconPath: 'assets/icons/mysql.svg' },
    { name: 'Spring Boot', iconPath: 'assets/icons/spring.svg' },
    { name: 'Git', iconPath: 'assets/icons/git.svg' }
  ];
}