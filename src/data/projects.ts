import ally1 from '../assets/images/projects/allymaps/ally1.png';
import ally2 from '../assets/images/projects/allymaps/ally2.png';
import ally3 from '../assets/images/projects/allymaps/ally3.png';
import ally4 from '../assets/images/projects/allymaps/ally4.png';
import allybg from '../assets/images/projects/allymaps/allybg.jpg';

import travel1 from '../assets/images/projects/travel/travel4.png';
import travel2 from '../assets/images/projects/travel/travel6.png';
import travel3 from '../assets/images/projects/travel/travel7.png';
import travelbg from '../assets/images/projects/travel/travelbg.jpeg';

import bicho1 from '../assets/images/projects/bicho/bicho1.png';
import bicho2 from '../assets/images/projects/bicho/bicho2.png';
import bichobg from '../assets/images/projects/bicho/bichobg.jpeg';

import meme1 from '../assets/images/projects/meme/meme1.png';
import meme2 from '../assets/images/projects/meme/meme2.png';
import memebg from '../assets/images/projects/meme/memebg.png';

import news1 from '../assets/images/projects/news/news1.png';
import news2 from '../assets/images/projects/news/news2.png';
import news3 from '../assets/images/projects/news/news3.png';
import newsbg from '../assets/images/projects/news/newsbg.jpeg';

import duck1 from '../assets/images/projects/rubber/duck1.png';
import duckbg from '../assets/images/projects/rubber/duckbg.jpeg';


export interface Project {
  name: string;
  description: string;
  github: string;
  live: string;
  pics: string[];
  stack: string[];
  bg: string;
}

export default function Project(): Project[] {

  const projects: Project[] = [
    {
      name: 'Ally Maps',
      description: 'A trip planner for people with disabilities. This app allows them to plan entire accessible trips from searching places to the routes to and from the places in their itineraries.',
      github: 'https://github.com/luisrrv/allymaps',
      live: 'https://allymaps.herokuapp.com/',
      pics: [ally1, ally2, ally3, ally4],
      stack: ['rails','postgress','heroku'],
      bg: allybg,
    },
    {
      name: 'Travel Journal',
      description: 'A React app where I keep track of my travels in a list with maps and picture albums of each location I visited.',
      github: 'https://github.com/luisrrv/React-Travel-Journal',
      live: 'https://luis-travel-journal.netlify.app',
      pics: [travel1, travel2, travel3],
      stack: ['react','typescript','firebase'],
      bg: travelbg,
    },
    {
      name: 'Bicho Bot (Twitter Bot)',
      description: "A twitter bot that posts a new tweet twice a day. It also likes and retweets others' tweets related to famous football player Cristiano Ronaldo.",
      github: 'https://github.com/luisrrv/bicho-bot-lambda',
      live: 'https://twitter.com/bicho_bot',
      pics: [bicho1, bicho2],
      stack: ['python','aws','docker','twitter'],
      bg: bichobg,
    },
    {
      name: 'Meme Generator',
      description: 'React app that lets you build memes by writing the text and getting the meme image from an API',
      github: 'https://github.com/luisrrv/Meme-Generator',
      live: 'https://luisrrv-meme.netlify.app',
      pics: [meme1, meme2],
      stack: ['react'],
      bg: memebg,
    },
    {
      name: 'News Feed',
      description: 'A news feed made with Vue.js. Search for news articles based on your interests and save your favorite topics to be displayed on the feed.',
      github: 'https://github.com/luisrrv/vue-news',
      live: '',
      pics: [news1, news2, news3],
      stack: ['vue'],
      bg: newsbg,
    },
    {
      name: 'Rubber Ducking',
      description: 'A Chrome Extension made for "rubber duck debbugging"',
      github: 'https://github.com/luisrrv/Rubber-Ducking-Chrome-Extension',
      live: 'https://chrome.google.com/webstore/detail/rubberducking/ilnajmkjbglgobggkhahkpgomnjjegpe',
      pics: [duck1],
      stack: ['javascript','chrome'],
      bg: duckbg,
    },
  ];

  return projects;
}
