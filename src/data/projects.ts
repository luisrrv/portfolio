import ally1 from '../assets/images/projects/allymaps/ally1.png';
import ally2 from '../assets/images/projects/allymaps/ally2.png';
import ally3 from '../assets/images/projects/allymaps/ally3.png';
// import ally4 from '../assets/images/projects/allymaps/ally4.png';
import allybg from '../assets/images/projects/allymaps/allybg.jpg';

import travel1 from '../assets/images/projects/travel/travel4.png';
import travel2 from '../assets/images/projects/travel/travel6.png';
import travel3 from '../assets/images/projects/travel/travel7_wide.png';
import travelbg from '../assets/images/projects/travel/travelbg.jpeg';

import bicho1 from '../assets/images/projects/bicho/bicho1_wide.png';
import bicho2 from '../assets/images/projects/bicho/bicho2.png';
import bichobg from '../assets/images/projects/bicho/bichobg.jpeg';

import footybg from '../assets/images/projects/footy/footybg.jpeg';

// import meme1 from '../assets/images/projects/meme/meme1_wide.png';
// import meme2 from '../assets/images/projects/meme/meme2.png';
// import memebg from '../assets/images/projects/meme/memebg.png';

import chat1 from '../assets/images/projects/chat/chat1.png';
import chat2 from '../assets/images/projects/chat/chat2_wide.png';
import chatbg from '../assets/images/projects/chat/chatbg.jpeg';

import news1 from '../assets/images/projects/news/news1_wide.png';
import news2 from '../assets/images/projects/news/news2.png';
import news3 from '../assets/images/projects/news/news3.png';
import newsbg from '../assets/images/projects/news/newsbg.jpeg';

import duck1 from '../assets/images/projects/rubber/duck1_wide.png';
import duckbg from '../assets/images/projects/rubber/duckbg.jpeg';

import footy1 from '../assets/images/projects/footy/footy1_wide.png';
import footy2 from '../assets/images/projects/footy/footy2.png';


export interface ProjectProps {
  name: string;
  description: string;
  github: string;
  live: string;
  pics: string[];
  stack: string[];
  bg: string;
}

export default function Project(): ProjectProps[] {

  const projects: ProjectProps[] = [
    {
      name: 'FootyPulse',
      description: "A web app made with Nextjs and Github Actions to follow football players to then, get daily updates of their current seasonal stats directly to the user's specified Discord channel.",
      github: 'https://github.com/luisrrv/footy-pulse',
      live: 'https://fotytpulse.netlify.app',
      pics: [footy1, footy2],
      stack: ['nextjs','typescript','supabase','tailwind','jest','actions','discord'],
      bg: footybg,
    },
    {
      name: 'Bicho Bot (X/Twitter Bot)',
      description: "A twitter bot that posts a new tweet twice a day. It also likes and retweets others' tweets related to famous football player Cristiano Ronaldo.",
      github: 'https://github.com/luisrrv/bicho-bot-lambda',
      live: 'https://twitter.com/bicho_bot',
      pics: [bicho1, bicho2],
      stack: ['python','aws','docker','twitter'],
      bg: bichobg,
    },
    {
      name: 'Web Chat App',
      description: 'A simple chat app, built using Express.js, Socket.io, and Tailwind CSS. Requires users to log in with a username in order to access the chat.',
      github: 'https://github.com/luisrrv/socket-chat',
      live: 'https://github.com/luisrrv/socket-chat',
      pics: [chat1, chat2],
      stack: ['expressjs', 'socketio', 'tailwind'],
      bg: chatbg,
    },
    {
      name: 'Travel Journal',
      description: "A React app to document my travels. For each location, you can browse through a collection of photos taken during the trip. you can also see where each photo was taken with its dedicated map.",
      github: 'https://github.com/luisrrv/React-Travel-Journal',
      live: 'https://luis-travel-journal.netlify.app',
      pics: [travel1, travel2, travel3],
      stack: ['react','typescript','firebase'],
      bg: travelbg,
    },
    {
      name: 'Ally Maps',
      description: 'A trip planner for people with disabilities. This app allows them to plan entire accessible trips from searching places to the routes to and from the places in their itineraries.',
      github: 'https://github.com/luisrrv/allymaps',
      live: 'https://allymaps.herokuapp.com/',
      pics: [ally1, ally2, ally3],
      stack: ['rails','postgress','heroku'],
      bg: allybg,
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
    {
      name: 'News Feed',
      description: 'A news feed made with Vue.js. Search for news articles based on your interests and save your favorite topics to be displayed on the feed.',
      github: 'https://github.com/luisrrv/vue-news',
      live: '',
      pics: [news1, news2, news3],
      stack: ['vue'],
      bg: newsbg,
    },
  ];

  return projects;
}
