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
import javaArrays from './java-arrays';
import javaBigPicture from './java-big-picture';
import javaDecisions from './java-decisions';
import javaLoops from './java-loops';
import javaMethods from './java-methods';
import javaOperators from './java-operators';
import javaStart from './java-start';
import javaText from './java-text';
import javaValues from './java-values';
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
      title: 'Intro to Java',
      by: 'From your first program to methods',
      optional: true,
      hint: 'New to Java? Check this out if you need the basics.',
      lessons: [
        javaStart,
        javaValues,
        javaOperators,
        javaText,
        javaDecisions,
        javaLoops,
        javaArrays,
        javaMethods,
        javaBigPicture,
      ],
    },
    {
      n: 1,
      title: 'Java Toolkit',
      by: 'Program anatomy, arrays, methods and overloading',
      lessons: [
        anatomy,
        arrays,
        methods,
      ],
    },
    {
      n: 2,
      title: 'Recursion and Algorithms',
      by: 'Recursion, searching and sorting',
      lessons: [
        recursion,
        searching,
        sorting,
      ],
    },
    {
      n: 3,
      title: 'Classes and Objects',
      by: 'Objects, constructors, encapsulation',
      lessons: [
        classes,
        constructors,
        encapsulation,
      ],
    },
    {
      n: 4,
      title: 'Modifiers',
      by: 'Access and non-access modifiers',
      lessons: [
        access,
        finalStatic,
      ],
    },
    {
      n: 5,
      title: 'Inheritance and Polymorphism',
      by: 'extends, super, overriding',
      lessons: [
        inheritance,
        superChains,
        polymorphism,
      ],
    },
    {
      n: 6,
      title: 'Abstraction and Interfaces',
      by: 'Abstract classes, interfaces, lambdas',
      lessons: [
        abstractClasses,
        interfaces,
        modernInterfaces,
      ],
    },
    {
      n: 7,
      title: 'Using the Java API',
      by: 'Packages, Strings, ArrayList, iterators',
      lessons: [
        api,
        collections,
        iterators,
      ],
    },
    {
      n: 8,
      title: 'Exceptions',
      by: 'try/catch, throw and throws',
      lessons: [
        tryCatch,
        throwing,
      ],
    },
    {
      n: 9,
      title: 'Swing GUI and Events',
      by: 'Windows, components, listeners, threads',
      lessons: [
        swing,
        events,
        threads,
      ],
    },
    {
      n: 10,
      title: 'Exam Lab',
      by: 'Error catalogue and full programs',
      lessons: [
        errorCatalogue,
        buildApps,
      ],
    },
  ],
};
