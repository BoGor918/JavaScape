import React from 'react'
import NavBar from './NavBar'
import Banner from '../images/Banner.png'
import Intro1 from '../images/Intro1.png'
import Intro2 from '../images/Intro2.png'
import Robot1 from '../images/Robot1.png'
import Robot2 from '../images/Robot2.png'
import Robot3 from '../images/Robot3.png'

export default function Home() {
  return (
    <div className='Home bg-[#09002B] bg-background flex flex-col text-white font-exo w-full'>
      <NavBar />
      {/* Website Banner */}
      <div>
        <img src={Banner} alt="" className="mt-16 sm:mt-26 md:mt-0 lg:mt-0" />
      </div>
      {/* Website Content */}
      <div className='max-w-[300px] sm:max-w-[300px] md:max-w-[800px] lg:max-w-[1240px] w-full mx-auto'>
        <div className='flex flex-col items-center'>
          {/* Welcome Message and hr line */}
          <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row w-full justify-between items-center mt-20'>
            <span className='md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>Welcome Member of javascape</span>
            <hr class="md:max-w-[25rem] lg:max-w-[40rem] w-full h-[3px] bg-[#B154F0] rounded border-0 dark:bg-gray-700" />
          </div>
          {/* First group paragraph and image */}
          <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row my-5 justify-center items-center'>
            <span className='md:text-[18px] md:pr-[2rem] lg:text-[23px] lg:pr-[5rem] text-justify w-full'>
              There is a serene planet named Javaland where people lead blissful lives and electricity is produced using the Java programming language. They disrupted the Java code's structure and threw off the balance of the power plant until a gang of monstrous Bugs came along and shattered the tranquility.
            </span>
            <img src={Intro1} alt="" className="mt-5 sm:mt-5 md:mt-0 lg:mt-0 md:max-w-[23rem] lg:max-w-[30rem] border-[3px] rounded-2xl border-[#B154F0]" />
          </div>
          {/* Second group paragraph and image */}
          <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row my-5 justify-center items-center'>
            <span className='md:text-[18px] md:pr-[2rem] lg:text-[23px] lg:pr-[5rem] text-justify w-full'>
              To combat bugs, fix the Java code's structure, and bring electricity back to the power plant, the Javaland planetary leader formed an organization called JavaScape. Additionally, you are a member of JavaScape, committed to assisting JavaScape in achieving its goal and preserving Javaland.
            </span>
            <img src={Intro2} alt="" className="mt-5 sm:mt-5 md:mt-0 lg:mt-0 md:max-w-[23rem] lg:max-w-[30rem] border-[3px] rounded-2xl border-[#B154F0]" />
          </div>
          {/* Navigation part */}
          <div className='flex flex-col my-[5rem] justify-center items-center'>
            {/* text topic */}
            <span className='md:text-[1.3rem] lg:text-[1.7rem] uppercase font-extrabold text-[#B154F0]'>What are you waiting for ?</span>
            {/* First group */}
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row mt-10 mb-0 sm:mb-0 md:mb-20 lg:mb-20">
              <img src={Robot1} alt="" className="my-5 sm:my-5 md:my-0 max-w-[14rem] sm:max-w-[14rem] sm:max-h-[14rem] md:max-w-[18rem] md:max-h-[18rem] md:mr-[5rem] lg:my-0 lg:max-w-[25rem] lg:max-h-[25rem] lg:mr-[7rem]" />
              <img src={Robot2} alt="" className="my-5 sm:my-5 md:my-0 max-w-[14rem] sm:max-w-[14rem] md:max-w-[18rem] md:max-h-[18rem] md:ml-[5rem] lg:my-0 lg:max-w-[25rem] lg:max-h-[25rem] lg:ml-[7rem]" />
            </div>
            {/* Second group */}
            <div className="flex">
              <img src={Robot3} alt="" className="my-20 sm:my-20 md:my-0 max-w-[14rem] sm:max-w-[14rem] md:max-w-[18rem] md:max-h-[18rem] md:mx-[5rem] lg:my-0 lg:max-w-[25rem] lg:max-h-[25rem]" />
            </div>
          </div>
          {/* Copyright */}
          <div className='flex justify-center items-center uppercase text-center mt-[0rem] sm:mt-[0rem] md:mt-[10rem] lg:mt-[10rem]'>
            <span className='text-[1px] sm:text-[1px] md:text-[13px] lg:text-[16px]'>Copyright © 2022 JavaScape. All Rights Reserved</span>
          </div>
        </div>
      </div>
    </div>
  )
}
