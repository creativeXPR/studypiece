// COS 202 interactive tutorial: Advanced Object-Oriented Programming (Java).
// Lessons mix explanations with Java screens (code, bug, predict, fill, better).
import abstractClasses from './abstract';
import access from './access';
import anatomy from './anatomy';
import api from './api';
import arrays from './arrays';
import buildApps from './build-apps';
import classes from './classes';
import collections from './collections';
import constructors from './constructors';
import encapsulation from './encapsulation';
import errorCatalogue from './error-catalogue';
import events from './events';
import finalStatic from './final-static';
import inheritance from './inheritance';
import interfaces from './interfaces';
import iterators from './iterators';
import methods from './methods';
import modernInterfaces from './modern-interfaces';
import polymorphism from './polymorphism';
import recursion from './recursion';
import searching from './searching';
import sorting from './sorting';
import superChains from './super';
import swing from './swing';
import threads from './threads';
import throwing from './throwing';
import tryCatch from './try-catch';

export default {
  code: 'COS 202',
  title: 'Advanced Object-Oriented Programming (Java)',
  chapters: [
    {
      n: 0,
      title: 'Java Toolkit',
      by: 'Program anatomy, arrays, methods and overloading',
      lessons: [
        anatomy,
        arrays,
        methods,
      ],
    },
    {
      n: 1,
      title: 'Recursion and Algorithms',
      by: 'Recursion, searching and sorting',
      lessons: [
        recursion,
        searching,
        sorting,
      ],
    },
    {
      n: 2,
      title: 'Classes and Objects',
      by: 'Objects, constructors, encapsulation',
      lessons: [
        classes,
        constructors,
        encapsulation,
      ],
    },
    {
      n: 3,
      title: 'Modifiers',
      by: 'Access and non-access modifiers',
      lessons: [
        access,
        finalStatic,
      ],
    },
    {
      n: 4,
      title: 'Inheritance and Polymorphism',
      by: 'extends, super, overriding',
      lessons: [
        inheritance,
        superChains,
        polymorphism,
      ],
    },
    {
      n: 5,
      title: 'Abstraction and Interfaces',
      by: 'Abstract classes, interfaces, lambdas',
      lessons: [
        abstractClasses,
        interfaces,
        modernInterfaces,
      ],
    },
    {
      n: 6,
      title: 'Using the Java API',
      by: 'Packages, Strings, ArrayList, iterators',
      lessons: [
        api,
        collections,
        iterators,
      ],
    },
    {
      n: 7,
      title: 'Exceptions',
      by: 'try/catch, throw and throws',
      lessons: [
        tryCatch,
        throwing,
      ],
    },
    {
      n: 8,
      title: 'Swing GUI and Events',
      by: 'Windows, components, listeners, threads',
      lessons: [
        swing,
        events,
        threads,
      ],
    },
    {
      n: 9,
      title: 'Exam Lab',
      by: 'Error catalogue and full programs',
      lessons: [
        errorCatalogue,
        buildApps,
      ],
    },
  ],
};
