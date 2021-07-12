import Converter from 'ppt-png'
import React from 'react'

export default function pptx() {
    const converter = Converter.create({
    files:  ['src\Mock-It.pptx'],
    output: 'output/'
});

const result = converter.convert();
console.log(result);
    return (
        <div>
            
        </div>
    )
}
