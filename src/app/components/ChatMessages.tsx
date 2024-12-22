import React from 'react'
import Markdown from 'react-markdown'

// TODO: Remove the duplicate interface and import the Message interface from the interface file
interface Message {
    role: 'user' | 'assistant';
    content: string;
    loading: boolean;
    error: boolean;
  }
export function ChatMessages({messages}:{messages:Message[]}) {
    return (
        <section className="w-full max-w-3xl mt-6 bg-white mb-36 p-6 rounded-lg shadow">
      {
        messages.length === 0 &&
          <div className="text-gray-700 leading-7 mt-5 mx-auto">
           Start a conversation by typing in the input field below
          </div>
      }

        {messages.map(({role,content,loading,error},index) => (
          <div key={index} className="mb-16">
            {(loading && !content) ? (
              <div className="text-gray-700 leading-7 mt-5">
                {/* TODO: Customize spinner */}
                {/* <Spinner /> */}
                Typing...
              </div>
            ) : role === 'assistant' ? (
              <div className="text-gray-700 leading-7 mt-5">
                <Markdown>{content}</Markdown>
              </div>
            ) : (
                <div className="rounded-md ml-auto text-right mt-5">
                <span className="bg-blue-50 border-blue-500 rounded p-5 text-gray-700 font-medium">
                  {content}
                </span>
              </div>
            )}
            {error && (
                // TODO: Customize error message
              <div className="text-gray-700 leading-7 mt-5">
                <div className='flex items-center gap-1 text-sm text-error-red'>
                  {/* <img className='h-5 w-5' src={errorIcon} alt='error' /> */}
                  <span>Error generating the response</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    );
}
