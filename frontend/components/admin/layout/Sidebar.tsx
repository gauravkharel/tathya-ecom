"use client"

import { MoreVertical, ChevronLast, ChevronFirst, Shirt, ShoppingBag, UsersRound, Settings2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, createContext, useState, ReactElement } from "react"
import MainLogo from '@/public/logo.svg'

export interface SidebarType {
    expanded: boolean
    // setExpanded:  React.Dispatch<React.SetStateAction<boolean>>
}
const SidebarContext = createContext<SidebarType>({ expanded: true})

export default function Sidebar() {
    const [expanded, setExpanded] = useState(true)
    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    {expanded ? <Image
                        priority
                        src={MainLogo}
                        alt='logo'
                        width={50}
                        height={50}
                    /> : <Image
                        priority
                        src={MainLogo}
                        alt='logo'
                        width={25}
                        height={25}
                    />}

                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">
                        <SidebarItem
                            icon={<Shirt />}
                            text="Product"
                            alert={false}
                            url="/warehouse/manage-products"

                        />
                        <SidebarItem
                            icon={<ShoppingBag />}
                            text="Order Management"
                            alert={false}
                            url="/warehouse/manage-orders"

                        />
                        <SidebarItem
                            icon={<UsersRound />}
                            text="User Management"
                            alert={false}
                            url="/warehouse/manage-users"
                        />
                        <SidebarItem
                            icon={<Settings2 />}
                            text="Setting"
                            alert={false}
                            url="/warehouse/manage-users"
                        />
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">

                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold">John Doe</h4>
                            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}


interface SiderbarItemProps {
    icon: ReactElement | undefined,
    url: string,
    active?: boolean,
    text: string,
    alert: boolean
}



export function SidebarItem({ icon, url, active, text, alert }: SiderbarItemProps) {
    const { expanded } = useContext(SidebarContext)

    return (
        <Link href={url} >
            <li className={`
                    relative flex items-center py-2 px-3 my-1
                    font-medium rounded-md cursor-pointer
                    transition-colors group
                    ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
                    `}
            >
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && (<div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />)}

                {!expanded && (
                    <div className={`
                                    absolute left-full rounded-md px-2 py-1 ml-6
                                    bg-indigo-100 text-indigo-800 text-sm
                                    invisible opacity-20 -translate-x-3 transition-all
                                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                                `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}