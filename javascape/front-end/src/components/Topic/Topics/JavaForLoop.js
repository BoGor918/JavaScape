import React from "react";
import { useNavigate } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function JavaForLoop() {
    // navigate function
    const navigate = useNavigate();

    return (
        <div className='JavaForLoop flex flex-col z-0'>
            {/* Topic name */}
            <span className="font-bold text-2xl">Java For Loop</span>
            {/* spec line */}
            <hr className="w-full h-[1px] bg-white rounded border-0 opacity-70 my-6" />
            {/* cate 1 */}
            <span className="font-bold text-xl">For Loop Syntax</span>
            <span className="my-3">When you know exactly how many times you want to loop through a block of code, use the for loop instead of a while loop:</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>
                    {`for (statement 1; statement 2; statement 3) {
  // code block to be executed
}`}
                </SyntaxHighlighter>
            </div>
            <span className="mt-3">Statement 1 is executed (one time) before the execution of the code block.</span>
            <span className="">Statement 2 defines the condition for executing the code block.</span>
            <span className="">Statement 3 is executed (every time) after the code block has been executed.</span>
            <span className="mb-3">The example below will print the numbers 0 to 4:</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>{`for (int i = 0; i < 5; i++) {
  System.out.println(i);
}`}             </SyntaxHighlighter>
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                    <button onClick={() => navigate("/compiler?program=for-loop-print")} className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Try Yourself</button>
                </div>
            </div>
            <span className="mt-3">Example explained:</span>
            <span className="">Statement 1 sets a variable before the loop starts (int i = 0).</span>
            <span className="">Statement 2 defines the condition for the loop to run (i must be less than 5). If the condition is true, the loop will start over again, if it is false, the loop will end.</span>
            <span className="mb-3">Statement 3 increases a value (i++) each time the code block in the loop has been executed.</span>
            <hr className="w-full h-[1px] bg-white rounded border-0 opacity-70 my-6" />
            {/* cate 2 */}
            <span className="font-bold text-xl">Nested Loops</span>
            <span className="my-3">It is also possible to place a loop inside another loop. This is called a nested loop.</span>
            <span className="mb-3">The "inner loop" will be executed one time for each iteration of the "outer loop":</span>
            {/* Example */}
            <div className="bg-black/20 rounded flex flex-col p-5">
                <span className="text-lg">Example</span>
                <SyntaxHighlighter className="flex flex-col bg-white text-black border-l-[5px] border-l-[#b962f4] p-3 my-5" language="java" style={docco}>{`// Outer loop
for (int i = 1; i <= 2; i++) {
  System.out.println("Outer: " + i); // Executes 2 times
  
  // Inner loop
  for (int j = 1; j <= 3; j++) {
    System.out.println(" Inner: " + j); // Executes 6 times (2 * 3)
  }
} `}</SyntaxHighlighter>
                <div className="bg-gradient-to-r from-[#FFA9C5] to-[#FF3073]/50 p-[2px] w-fit">
                    <button onClick={() => navigate("/compiler?program=nested-loops")} className='px-3 h-[2.6rem] bg-[#371152] duration-200 hover:bg-[#541680] border-gradient-to-br from-[#FC6DFF] to-[#9900ff]/30 font-extrabold uppercase'>Try Yourself</button>
                </div>
            </div>
        </div>
    )
}
