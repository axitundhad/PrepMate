import React from 'react';
import {LuCopy,LuCheck,LuCode} from "react-icons/lu";
import ReactMarkdown from "react-markdown" ;
import remarksGfm from "remark-gfm"; 
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter" ; 
import {oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({content}) => {
    if(!content) return null
    return (
        <div className=''>
            <div className=''>
                <ReactMarkdown
                    remarkPlugins={[remarksGfm]}
                    components={{
                        p: ({children}) => { x
                            return <p className=''>
                                {children}
                            </p>;
                        },
                        strong: ({children}) => { 
                            return <strong>{children}</strong>
                        },
                        em: ({children}) => { 
                            return <em>{children}</em> 
                        },
                        ul: ({children}) => { 
                            return <ul className=''>{children}</ul>
                        },
                        ol: ({children}) => { 
                            return <ol className=''>{children}</ol>
                        },
                        li: ({children}) => { 
                            return <li className=''>{children}</li>
                        },
                        blockquote: ({children}) => { 
                            return <blockquote className=''>{children}</blockquote>
                        },
                        h1: ({children}) => {
                            return <h2 className=''>{children} </h2>
                        },
                        h2: ({children}) => { 
                            return <h3 className=''> {children}</h3> 
                        },
                        h4: ({children}) => {
                            return <h4 className=''>{children}</h4>
                        },
                        a: ({children,href}) => { x
                            return <a href={href} className=''>{children}</a>
                        },
                        table: ({children}) => { 
                            return (
                                <div>
                                    <table className=''>
                                        {children}
                                    </table>
                                </div>
                            )
                        },
                        thead: ({children}) => { 
                            return <thead className=''>{children}</thead>
                        },
                        tbody: ({children}) => { 
                            return <tbody className=''>{children}</tbody>
                        },
                        tr: ({children}) => { 
                            return ( 
                                <tr> {/* Corrected: Changed <th> to <tr> for table row */}
                                    {children}
                                </tr>
                            ) // Added closing parenthesis for JSX
                        },
                        td: ({children}) => { 
                            return <td className=''>{children}</td>
                        },
                        hr: () => { 
                            return <hr className=''/>
                        },
                        img: ({src,alt}) => { 
                            return <img src={src} alt={alt} className='' />
                        },
                       
                    }}
                >
                    {content} 
                </ReactMarkdown>
            </div>
        </div>
    );
}

export default AIResponsePreview;