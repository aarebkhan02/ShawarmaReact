// import axios from "axios"
// import React, { useEffect, useRef, useState } from "react"
// import { useForm } from "react-hook-form"
// import { LuSendHorizontal, LuMenu } from "react-icons/lu"

// export default function App() {
//   const [chat, setChat] = useState([])
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const { register, handleSubmit, reset } = useForm()
//   const chatEndRef = useRef(null)

//   const url = "https://shawarma-production.up.railway.app"

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${url}/chat`,
//         { message: data.message },
//         { headers: { "Content-Type": "application/json" } }
//       )

//       setChat((prev) => [...prev, response.data])
//       reset()
//     } catch (error) {
//       console.error("API Error:", error)
//     }
//   }

//   const clearChat = () => setChat([])

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat])

//   return (
//     <div className="h-screen flex bg-[#FAFAFB] text-gray-800 pb-safe overflow-hidden">

//       {/* MOBILE OVERLAY */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`fixed md:static z-50 h-full w-64 bg-[#F4F2FF] p-5 flex flex-col transition-transform
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//       >
//         <h2 className="text-lg font-semibold text-[#7C5CFC] mb-8">
//           🥙 SHAWARMA
//         </h2>

//         <button
//           onClick={clearChat}
//           className="text-sm px-3 py-2 rounded-lg hover:bg-white/60 transition"
//         >
//           ➕ New Chat
//         </button>

//         <div className="mt-auto text-xs text-gray-400">
//           Purple AI Assistant
//         </div>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 flex flex-col relative">

//         {/* HEADER */}
//         <header className="h-14 flex items-center gap-3 px-4 md:px-6 bg-[#FAFAFB]">
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <LuMenu size={20} />
//           </button>

//           <p className="font-medium text-gray-600">Chat</p>
//         </header>

//         {/* CHAT AREA */}
//         <section className="flex-1 overflow-y-auto px-4 md:px-6 py-8 space-y-8">
//           {chat.length === 0 && (
//             <div className="text-center text-gray-400 mt-24">
//               <p className="text-lg font-medium">
//                 How can I help you today?
//               </p>
//             </div>
//           )}

//           {chat.map((item, idx) => (
//             <div key={idx} className="space-y-6">

//               {/* USER */}
//               <div className="flex justify-end">
//                 <div className="max-w-[85%] md:max-w-[65%] bg-[#7C5CFC] text-white px-5 py-3 rounded-2xl">
//                   <p className="text-sm">{item.User}</p>
//                 </div>
//               </div>

//               {/* BOT */}
//               <div className="flex gap-3 items-start">
//                 <div className="w-8 h-8 rounded-full bg-[#7C5CFC]/15 flex items-center justify-center">
//                   🥙
//                 </div>
//                 <div className="max-w-[85%] md:max-w-[65%] bg-white px-5 py-3 rounded-2xl">
//                   <p className="text-sm whitespace-pre-line">
//                     {item.Shawarma}
//                   </p>
//                 </div>
//               </div>

//             </div>
//           ))}

//           <div ref={chatEndRef} />
//         </section>

//         {/* INPUT */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="bg-[#FAFAFB] px-4 md:px-6 py-3 sticky bottom-0"
//         >
//           <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-md">
//             <input
//               {...register("message", { required: true })}
//               placeholder="Message Shawarma..."
//               className="flex-1 outline-none text-sm"
//             />

//             <button
//               type="submit"
//               className="p-3 rounded-full bg-[#7C5CFC] text-white hover:opacity-90 transition"
//             >
//               <LuSendHorizontal size={18} />
//             </button>
//           </div>
//         </form>

//       </main>
//     </div>
//   )
// }


// import axios from "axios"
// import React, { useEffect, useRef, useState } from "react"
// import { useForm } from "react-hook-form"
// import { LuSendHorizontal, LuMenu } from "react-icons/lu"

// export default function App() {
//   const [chat, setChat] = useState([])
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [user, setUser] = useState(null)
//   const chatEndRef = useRef(null)

//   const { register, handleSubmit, reset } = useForm()
//   const { register: registerName, handleSubmit: handleNameSubmit } = useForm()

//   const url = "https://shawarma-production.up.railway.app"

//   /* ---------------- LOAD USER + CHAT ---------------- */
//   useEffect(() => {
//     const savedUser = localStorage.getItem("currentUser")
//     if (savedUser) {
//       setUser(savedUser)
//       const savedChat = localStorage.getItem(`chat_${savedUser}`)
//       if (savedChat) setChat(JSON.parse(savedChat))
//     }
//   }, [])

//   /* ---------------- SAVE CHAT ---------------- */
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem(`chat_${user}`, JSON.stringify(chat))
//     }
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [chat, user])

//   /* ---------------- USER NAME SUBMIT ---------------- */
//   const onNameSubmit = (data) => {
//     localStorage.setItem("currentUser", data.name)
//     setUser(data.name)

//     const savedChat = localStorage.getItem(`chat_${data.name}`)
//     setChat(savedChat ? JSON.parse(savedChat) : [])
//   }

//   /* ---------------- MESSAGE SUBMIT ---------------- */
//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         `${url}/chat`,
//         { message: data.message },
//         { headers: { "Content-Type": "application/json" } }
//       )

//       setChat((prev) => [...prev, response.data])
//       reset()
//     } catch (error) {
//       console.error("API Error:", error)
//     }
//   }

//   const clearChat = () => {
//     setChat([])
//     localStorage.removeItem(`chat_${user}`)
//   }

//   /* ================= NAME SCREEN ================= */
//   if (!user) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-[#FAFAFB]">
//         <form
//           onSubmit={handleNameSubmit(onNameSubmit)}
//           className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
//         >
//           <h2 className="text-lg font-semibold text-center">
//             🥙 Welcome to Shawarma
//           </h2>

//           <input
//             {...registerName("name", { required: true })}
//             placeholder="Enter your name"
//             className="w-full border rounded-lg px-4 py-2 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-[#7C5CFC] text-white py-2 rounded-lg"
//           >
//             Start Chat
//           </button>
//         </form>
//       </div>
//     )
//   }

//   /* ================= CHAT UI ================= */
//   return (
//     <div className="h-screen flex bg-[#FAFAFB] text-gray-800 overflow-hidden">

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <aside className={`fixed md:static z-50 h-full w-64 bg-[#F4F2FF] p-5 flex flex-col transition-transform
//         ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

//         <h2 className="text-lg font-semibold text-[#7C5CFC] mb-2">
//           🥙 SHAWARMA
//         </h2>

//         <p className="text-sm text-gray-600 mb-6">
//           User: <b>{user}</b>
//         </p>

//         <button
//           onClick={clearChat}
//           className="text-sm px-3 py-2 rounded-lg hover:bg-white/60"
//         >
//           ➕ New Chat
//         </button>

//         <div className="mt-auto text-xs text-gray-400">
//           Purple AI Assistant
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col">

//         <header className="h-14 flex items-center gap-3 px-4 bg-[#FAFAFB]">
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <LuMenu size={20} />
//           </button>
//           <p className="font-medium text-gray-600">Chat</p>
//         </header>

//         <section className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
//           {chat.length === 0 && (
//             <div className="text-center text-gray-400 mt-24">
//               How can I help you today?
//             </div>
//           )}

//           {chat.map((item, idx) => (
//             <div key={idx} className="space-y-6">

//               <div className="flex justify-end">
//                 <div className="bg-[#7C5CFC] text-white px-5 py-3 rounded-2xl max-w-[65%]">
//                   {item.User}
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <div className="w-8 h-8 rounded-full bg-[#7C5CFC]/15 flex items-center justify-center">
//                   🥙
//                 </div>
//                 <div className="bg-white px-5 py-3 rounded-2xl max-w-[65%] whitespace-pre-line">
//                   {item.Shawarma}
//                 </div>
//               </div>

//             </div>
//           ))}

//           <div ref={chatEndRef} />
//         </section>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="px-4 py-3 bg-[#FAFAFB]"
//         >
//           <div className="flex gap-3 bg-white px-4 py-3 rounded-2xl shadow">
//             <input
//               {...register("message", { required: true })}
//               placeholder="Message Shawarma..."
//               className="flex-1 outline-none"
//             />
//             <button className="bg-[#7C5CFC] text-white p-3 rounded-full">
//               <LuSendHorizontal size={18} />
//             </button>
//           </div>
//         </form>

//       </main>
//     </div>
//   )
// }


import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { LuSendHorizontal, LuMenu, LuLogOut } from "react-icons/lu"

const STORAGE_KEY = "usersData"

export default function App() {
  const [user, setUser] = useState(null)
  const [usersData, setUsersData] = useState({})
  const [activeChatId, setActiveChatId] = useState(null)
  const [chat, setChat] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const chatEndRef = useRef(null)
  const { register, handleSubmit, reset } = useForm()
  const { register: registerName, handleSubmit: handleNameSubmit } = useForm()

  const url = "https://shawarma-hnls.onrender.com"

  /* ---------------- SAFE DERIVED DATA ---------------- */
  const userChats = usersData?.[user]?.chats || []

  /* ---------------- LOAD STORAGE ---------------- */
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
    const storedUser = localStorage.getItem("currentUser")

    setUsersData(storedUsers)

    if (storedUser && storedUsers[storedUser]) {
      setUser(storedUser)
      const firstChat = storedUsers[storedUser].chats?.[0]
      if (firstChat) {
        setActiveChatId(firstChat.id)
        setChat(firstChat.messages)
      }
    }
  }, [])


  useEffect(() => {
  const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  const storedUser = localStorage.getItem("currentUser")

  // 🔥 migrate chats without id
  Object.keys(storedUsers).forEach((u) => {
    storedUsers[u].chats = storedUsers[u].chats.map((c) => ({
      id: c.id || crypto.randomUUID(),
      title: c.title,
      messages: c.messages || []
    }))
  })

  setUsersData(storedUsers)

  if (storedUser && storedUsers[storedUser]) {
    setUser(storedUser)
    const firstChat = storedUsers[storedUser].chats?.[0]
    if (firstChat) {
      setActiveChatId(firstChat.id)
      setChat(firstChat.messages)
    }
  }
}, [])

  /* ---------------- SAVE STORAGE ---------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usersData))
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [usersData, chat])

  /* ---------------- LOGIN ---------------- */
  const onNameSubmit = ({ name }) => {
    const updated = {
      ...usersData,
      [name]: usersData[name] || { chats: [] }
    }

    setUsersData(updated)
    localStorage.setItem("currentUser", name)
    setUser(name)

    if (updated[name].chats.length === 0) {
      createNewChat(updated, name)
    } else {
      const firstChat = updated[name].chats[0]
      setActiveChatId(firstChat.id)
      setChat(firstChat.messages)
    }
  }

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
    setChat([])
    setActiveChatId(null)
  }

  /* ---------------- NEW CHAT ---------------- */
  const createNewChat = (data = usersData, username = user) => {
    if (!username) return

    const newChat = {
      id: crypto.randomUUID(), // ✅ CHAT ID
      title: "New Chat",
      messages: []
    }

    const updated = {
      ...data,
      [username]: {
        chats: [newChat, ...(data[username]?.chats || [])]
      }
    }

    setUsersData(updated)
    setActiveChatId(newChat.id)
    setChat([])
  }


  /* ---------------- SWITCH CHAT ---------------- */
  const switchChat = (chatId) => {
    const selected = userChats.find((c) => c.id === chatId)
    if (!selected) return

    setActiveChatId(chatId)
    setChat(selected.messages)
    setSidebarOpen(false)
  }


  /* ---------------- DELETE CHAT ---------------- */
  /* ---------------- DELETE CHAT ---------------- */
  const deleteChatById = (chatId) => {
    if (!chatId || !user) return

    setUsersData((prev) => {
      const remainingChats = prev[user].chats.filter(
        (c) => c.id !== chatId
      )

      const nextChat = remainingChats[0] || null

      setActiveChatId(nextChat?.id || null)
      setChat(nextChat?.messages || [])

      return {
        ...prev,
        [user]: {
          chats: remainingChats
        }
      }
    })
  }





  /* ---------------- GET BOT RESPONSE (TYPING EFFECT) ---------------- */
  const getResponse = async (userMessage) => {
    try {
      const res = await axios.post(
        `${url}/chat`,
        { message: userMessage },
        { headers: { "Content-Type": "application/json" } }
      )

      const fullText = res.data.Shawarma
      const words = fullText.split(" ")
      let index = 0

      const interval = setInterval(() => {
        index++

        setChat((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            Shawarma: words.slice(0, index).join(" ")
          }
          return updated
        })

        if (index === words.length) {
          clearInterval(interval)
        }
      }, 60)

    } catch (err) {
      console.error(err)
    }
  }


  /* ---------------- SEND MESSAGE ---------------- */
  /* ---------------- SEND MESSAGE ---------------- */
  const onSubmit = ({ message }) => {
    // 1️⃣ add user msg + empty bot msg
    const tempMessages = [
      ...chat,
      { User: message, Shawarma: "" }
    ]

    setChat(tempMessages)
    reset()

    // 2️⃣ save to localStorage
    setUsersData((prev) => ({
      ...prev,
      [user]: {
        chats: prev[user].chats.map((c) =>
          c.id === activeChatId
            ? {
              ...c,
              title:
                c.title === "New Chat"
                  ? message.slice(0, 25)
                  : c.title,
              messages: tempMessages
            }
            : c
        )
      }
    }))

    // 3️⃣ fetch bot response
    getResponse(message)
  }


  /* ================= LOGIN SCREEN ================= */
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAFAFB]">
        <form
          onSubmit={handleNameSubmit(onNameSubmit)}
          className="bg-white p-6 rounded-2xl shadow-md w-80 space-y-4"
        >
          <h2 className="text-lg font-semibold text-center">
            🥙 Welcome to Shawarma
          </h2>

          <input
            {...registerName("name", { required: true })}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button className="w-full bg-[#7C5CFC] text-white py-2 rounded-lg">
            Start Chat
          </button>
        </form>
      </div>
    )
  }

  /* ================= CHAT UI ================= */
  return (
    <div className="h-screen flex bg-[#FAFAFB] overflow-hidden">

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed md:static z-50 h-full w-64 bg-[#F4F2FF] p-5 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        <h2 className="text-lg font-semibold text-[#7C5CFC]">🥙 SHAWARMA</h2>
        <p className="text-sm mb-4">User: <b>{user}</b></p>

        <button
          onClick={() => createNewChat()}
          className="mb-3 px-3 py-2 bg-white rounded-lg text-sm"
        >
          ➕ New Chat
        </button>
        


        <div className="flex-1 overflow-y-auto space-y-2">
          {userChats.map((c) => (
            <div
              key={c.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm
      ${c.id === activeChatId ? "bg-white" : "hover:bg-white/60"}`}
            >
              <button
                onClick={() => switchChat(c.id)}
                className="flex-1 text-left"
              >
                {c.title}
              </button>

              <button
                onClick={() => deleteChatById(c.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                🗑
              </button>
            </div>
          ))}

        </div>

        <button
          onClick={logout}
          className="mt-4 flex items-center gap-2 text-red-500 text-sm"
        >
          <LuLogOut /> Logout
        </button>
      </aside>

      <main className="flex-1 flex flex-col">

        <header className="h-14 flex items-center px-4">
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <LuMenu size={20} />
          </button>
        </header>

        <section className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
          {chat.map((item, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex justify-end">
                <div className="bg-[#7C5CFC] text-white px-4 py-2 rounded-2xl">
                  {item.User}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-[#7C5CFC]/15 rounded-full flex items-center justify-center">
                  🥙
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl whitespace-pre-line">
                  {item.Shawarma}
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="flex gap-3 bg-white px-4 py-3 rounded-2xl shadow">
            <input
              {...register("message", { required: true })}
              placeholder="Message Shawarma..."
              className="flex-1 outline-none"
            />
            <button className="bg-[#7C5CFC] text-white p-3 rounded-full">
              <LuSendHorizontal size={18} />
            </button>
          </div>
        </form>

      </main>
    </div>
  )
}


