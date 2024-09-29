import Image from 'next/image';
import Link from 'next/link'

export default function Search_box(){
    return(
      <div className="grid grid-cols-2 gap-4 p-20 bg-green-700 items-center">
        <div className=''>
            <h2 className='mx-10 my-5 text-3xl text-white font-semibold'>Find the right <i>freelance</i> service, right away</h2>
            <div className="flex mx-10 rounded bg-white">
                <input className=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." />
                <button type="submit" className="m-2 rounded bg-blue-600 px-4 py-2 text-white">
                    <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg"  version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  width="512px" height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </button>
            </div>
        </div>
        <div>
            <Image 
                className=''
                alt='Person_image'
                src="/images/person_working.svg"
                width={600}
                height={600}
            />
        </div>
      </div>
  
    )
  }