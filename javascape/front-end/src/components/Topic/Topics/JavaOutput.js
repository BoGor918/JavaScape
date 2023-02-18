import React from "react";
import { useNavigate } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function JavaOutput() {
    // navigate function
    const navigate = useNavigate();

    return (
        <div className='JavaOutput flex flex-col z-0'>
            {/* Topic name */}
            <span className="font-bold text-lg sm:text-lg md:text-2xl lg:text-2xl">Java Output / Print</span>
            {/* spec line */}
            <hr className="w-full h-[1px] bg-white rounded border-0 opacity-70 my-6" />
            {/* cate 1 */}
            <span className="font-bold test-sm sm:text-sm  md:text-xl lg:text-xl">Print Text</span>
            <span className="my-3 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">You learned from the previous chapter that you can use the <span className="bg-white text-[#DD4A68] px-1">println()</span> method to output values or print text in Java:</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>{`System.out.println("Hello World!");`}</SyntaxHighlighter>
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                    <button onClick={() => navigate("/compiler?program=print-single-string")} className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Try Yourself</button>
                </div>
            </div>
            <span className="my-3 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">You can add as many <span className="bg-white text-[#DD4A68] px-1">println()</span> methods as you want. Note that it will add a new line for each method:</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>{`System.out.println("Hello World!");\nSystem.out.println("I am learning Java.");\nSystem.out.println("It is awesome!");`}</SyntaxHighlighter>
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                    <button onClick={() => navigate("/compiler?program=print-multiple-string")} className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Try Yourself</button>
                </div>
            </div>
            <hr className="w-full h-[1px] bg-white rounded border-0 opacity-70 my-6" />
            {/* cate 2 */}
            <span className="font-bold test-sm sm:text-sm  md:text-xl lg:text-xl">Double Quotes</span>
            <span className="my-3 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">When you are working with text, it must be wrapped inside double quotations marks <span className="bg-white text-[#DD4A68] px-1">" "</span> .</span>
            <span className="mb-3 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">If you forget the double quotes, an error occurs:</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5 text-[12px] sm:text-[12px] md:text-[16px] lg:text-[16px]">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>{`System.out.println("This sentence will work!");`}</SyntaxHighlighter>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#DD4A68] p-3 mb-5" language="java" style={docco}>{`System.out.println(This sentence will produce an error);`}</SyntaxHighlighter>
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                    <button onClick={() => navigate("/compiler?program=double-quote")} className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Try Yourself</button>
                </div>
            </div>
        </div>
    )
}