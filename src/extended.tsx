import { Provider, useDispatch } from "react-redux";
import store from "./store"; // path to your Redux store
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
// import "../extendes.css";
import './extendes.css'
import configAPI from "./utils/configAPI";
import getextendedAPI from "./utils/ExtendedAPI";
import getextendedAMTAPI from "./utils/getAmountTenderedAPI";
import { ExtendedDataWebSocket,LoginWebSocket,LogoutWebSocket } from "./websocket";
import { BASE_URL } from "./config";
import {  useSelector } from "react-redux";
import { RootState } from "./store";
import { setGlobalItems } from "./globalSlice";




interface ItemData {
  autonum:number;
  qty: number;
  quantity: number;
  description: string;
  price: number;
  amount: number;
  barcode: string;
  line_no:number;
}

interface SocketMessage {
  newData:ItemData;
  action: "Save" | "Update" | "Delete" | "Logout" | 'Login' | 'BatchUpdate';
  count: number;
  type :string;
}

// Assume configAPI is globally available or imported


export const Extended: React.FC = () => {
 
  const dispatch = useDispatch();
  const [items, setItems] = useState<ItemData[]>([]);
  const [AmtTendered,setAmtTendered] = useState<any>(0)
  const [Change,setChange] = useState<any>(0)
  const [totalQty, setTotalQty] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  let SocketExtended: WebSocket | null = null;

const items1 = useSelector((state: RootState) => state.global.globalItems);

// useEffect(() => {

//     if (extendedAPI) {
//       console.log('extended',extendedAPI)
//       const removeListener = extendedAPI.onSyncGlobalItems((data) => {
//         console.log('Order List',data)
//         setItems(data);
//       });

//       extendedAPI.requestCurrentGlobalItems?.();

//       return () => removeListener();
//     }

// }, []);

const [cartItems, setCartItems] = useState<any[]>([]);

useEffect(() => {
  const api = getextendedAPI(); // ✅ Use getter, not a constant
  const cleanup = api.onSyncGlobalItems((data: any[]) => {
      setCartItems(data);
      updateTotals(data)
      setAmtTendered(0)
      setChange(0)
  });
  // Request current cart on load
  api.requestCurrentGlobalItems()
    .then((data) => {
      if (data) {setCartItems(data),updateTotals(data),setAmtTendered(0)
              setChange(0)};
    })
    .catch((err) => {
      console.error("Error requesting current items:", err);
    });

  return () => {
    cleanup();
  };
}, []);


useEffect(() => {
  const api = getextendedAMTAPI(); // ✅ Use getter, not a constant
  const cleanup = api.onSyncGlobalTendered((data: any) => {
    setAmtTendered(data.Amount)
    setChange(data.Change);
   
  });
  // Request current cart on load
  api.requestCurrentGlobalTendered()
    .then((data:any) => {
      if (data) {setAmtTendered(data.Amount),setChange(data.Change)};
    })
    .catch((err) => {
      console.error("Error requesting current items:", err);
    });

  return () => {
    cleanup();
  };
}, []);



useEffect(() => {
  let isMounted = true;
  let SocketExtended: WebSocket | null = null;
  let SocketLogin: WebSocket | null = null;
  let SocketLogout: WebSocket | null = null;

  const initialize = async () => {
    try {
      // 1️⃣ Load config first
      const config = await configAPI.get();
      const BASE_URL = `${config.ipaddress}:${config.port}`;
      const serialNo = config.serialNo;

      // 2️⃣ Setup WebSocket
      // ExtendedDataWebSocket().then((ws) => {
      //   if (!ws || !isMounted) return;

      //   SocketExtended = ws;

      //   ws.onopen = () => {
      //     console.log("Extended WebSocket connected");
      //     ws.send(JSON.stringify({ message: "Hello Extended Monitor!" }));
      //   };

      //   ws.onmessage = (event) => {
      //     try {
      //       const message: SocketMessage = JSON.parse(event.data);
      //       const {action, newData, type } = message;
      //     if (newData && action) {
      //       console.log(`action ${action}`,newData)
      //         setItems((prev = []) => {
      //           let updated = [...prev]; // copy old state
      //           const dataArray = Array.isArray(newData) ? newData : [newData];

      //           switch (action) {
      //             case "Save":
      //              updated = [...dataArray, ...prev];

      //                 // dedupe while keeping the *first* occurrence (new item wins)
      //                 const unique = Array.from(
      //                   new Map(updated.map(item => [item.autonum, item])).values()
      //                 );
      //                 updateTotals(unique);
      //                 updated = unique;
      //               break;

      //             case "Update":
      //               // update existing item(s) by autonum
      //                  updated = prev.map(item => {
      //                   const match = dataArray.find(d => Number(d.lineno) === Number(item.line_no));
      //                   console.log("matchsssss",match)
      //                   const newItem = match
      //                     ? { 
      //                         ...item,
      //                         qty: Number(match.quantity), 
      //                         price: parseFloat(match.price), 
      //                         amount: parseFloat(match.totalAmount.replace(/,/g, '')), 
      //                         ...match 
      //                       }
      //                     : item;

      //                   console.log('Updated item:', newItem);
      //                   return newItem;
      //                 });

      //                     break;

      //             case "Delete":
      //               // remove item(s) by autonum
      //               updated = prev.filter(
      //                 item => !dataArray.some(d => d.lineno === item.line_no)
      //               );
      //               break;

      //             default:
      //               break;
      //           }

      //           // Deduplicate to be safe
      //           const unique = Array.from(
      //             new Map(updated.map(item => [item.autonum, item])).values()
      //           );

      //           updateTotals(unique);
      //           return unique;
      //         });
      //       }



      //         // setItems((prev = []) => {
      //         //   const safePrev = Array.isArray(prev) ? prev : [];
      //         //   let updated = [...safePrev];

      //           // if (action === "Save") {
      //           //   updated.unshift(newData);
      //           // } else if (action === "Update") {
      //           //   updated = updated.map((i) =>
      //           //     i.barcode === newData.barcode
      //           //       ? {
      //           //           ...i,
      //           //           qty: newData.qty,
      //           //           amount: newData.qty * newData.price,
      //           //         }
      //           //       : i
      //           //   );
      //           // } else if (action === "Delete") {
      //           //   updated = updated.filter((i) => i.barcode !== newData.barcode);
      //           // } else if (action === "Login") {
      //         //     updated = Array.isArray(newData) ? newData : [newData];
      //         //   // }

      //         //   updateTotals(updated);
      //         //   return updated;
      //         // });
      //       // }
      //     } catch (err) {
      //       console.error("Invalid WebSocket message:", err);
      //     }
      //   };

      //   ws.onerror = (err) => console.error("Extended WebSocket error:", err);
      // });





        // ExtendedDataWebSocket().then((ws) => {
        //             if (!ws || !isMounted) return;

        //             SocketExtended = ws;

        //             ws.onopen = () => {
        //               console.log("✅ Extended WebSocket connected");
        //               ws.send(JSON.stringify({ message: "Hello Extended Monitor!" }));
        //             };

        //             ws.onmessage = (event) => {
        //               try {
        //                 const message: SocketMessage = JSON.parse(event.data);
        //                 const { action, newData } = message;
        //                 console.log('action',action)
        //                 console.log('newData',newData)

        //                 if (!newData || !action) return;

        //                 // Handle batch update from backend
        //               if (action === "Save") {
        //                 setItems(prev => {
        //                   // Make a copy of current items
        //                   let updated = [...prev];
        //                   const dataArray = Array.isArray(newData) ? newData : [newData];

        //                   // Always add new items
        //                   dataArray.forEach(item => {
        //                     const newItem = {
        //                       ...item,
        //                       qty: Number(item.quantity ?? item.qty ?? 0),
        //                       price: parseFloat(String(item.price ?? 0)),
        //                       amount: parseFloat(String(item.totalAmount ?? item.amount ?? 0).replace(/,/g, '')),
        //                     };
        //                     updated.unshift(newItem); // always push, never replace
        //                   });
        //                   updateTotals(updated);

        //                   return updated;
        //                 });
        //               }


        //               if (action === "Update") {
        //                   setItems(prev => {
        //                     let updated = [...prev];
        //                     const dataArray = Array.isArray(newData) ? newData : [newData];

        //                     updated = updated.map(item => {
        //                       const match = dataArray.find(d => Number(d.line_no) === Number(item.line_no));
        //                       if (match) {
        //                         return {
        //                           ...item,
        //                           ...match,
        //                           qty: Number(match.quantity ?? match.qty ?? item.qty),
        //                           price: parseFloat(String(match.price ?? item.price)),
        //                           amount: parseFloat(String(match.totalAmount ?? match.amount ?? item.amount).replace(/,/g, '')),
        //                         };
        //                       }
        //                       return item;
        //                     });

        //                     updated = Array.from(new Map(updated.map(i => [i.autonum, i])).values());

        //                     updateTotals(updated);

        //                     return updated;
        //                   });
        //                 }

        //                 // --------------------
        //                 // DELETE
        //                 // --------------------
        //               if (action === "Delete") {
        //                   setItems(prev => {
        //                     let updated = [...prev];
        //                     const dataArray = Array.isArray(newData) ? newData : [newData];

        //                     updated = updated.filter(item => !dataArray.some(d => Number(d.line_no) === Number(item.line_no)));

        //                     updated = Array.from(new Map(updated.map(i => [i.autonum, i])).values());

        //                     updateTotals(updated);

        //                     return updated;
        //                   });
        //                 }
        //               } catch (err) {
        //                 console.error("❌ Invalid WebSocket message:", err);
        //               }
        //             };
        // });


      LogoutWebSocket().then((ws) => {
        if (!ws || !isMounted) return;

        SocketLogout = ws;
        ws.onmessage = (event) => {
          try {
            const message: SocketMessage = JSON.parse(event.data);
            const { action } = message;

            if (action ==='Logout'){
              setItems([])
              setAmtTendered(0)
              setChange(0)
            }
         
          } catch (err) {
            console.error("Invalid WebSocket message:", err);
          }
        };

        ws.onerror = (err) => console.error("Logout WebSocket error:", err);
      });


      LoginWebSocket().then((ws) => {
        if (!ws || !isMounted) return;

        SocketLogin = ws;
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
    
            const { action, newData, type } = message;


            if (newData && newData > 0) {
 
              setItems((prev = []) => {
                const safePrev = Array.isArray(prev) ? prev : [];
                let updated = [...safePrev];

               if (action === "Login") {
                 FecthVideo()
           
                    updated = Array.isArray(newData) ? newData : [newData];
                
                 
                }

                updateTotals(updated);
                return updated;
              });
            }else{
              setItems([])
              updateTotals([]);
              setAmtTendered(0)
              setChange(0)
            }
         
          } catch (err) {
            console.error("Invalid WebSocket message:", err);
          }
        };

        ws.onerror = (err) => console.error("Login WebSocket error:", err);
      });

      // 3️⃣ Fetch video
      try {
        const resVideo = await fetch(
          `${BASE_URL}/api/video-upload/?serialNo=${encodeURIComponent(serialNo)}`,
          {
            method: "GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const videoData = await resVideo.json();
        console.log('Fetched video data:', videoData.data);
        setVideoUrl(videoData.data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      }
    } catch (err) {
      console.error("Initialization failed:", err);
    }
  };

  initialize();

  // ✅ Proper cleanup
  return () => {
    isMounted = false;
  // if (SocketExtended) SocketExtended.close();
  if (SocketLogin) SocketLogin.close();
  if (SocketLogout) SocketLogout.close();
  };
}, []);



const FecthVideo = async() => {
   try {
      const config = await configAPI.get();
      const BASE_URL = `${config.ipaddress}:${config.port}`;
      const serialNo = config.serialNo;
        const resVideo = await fetch(
          `${BASE_URL}/api/video-upload/?serialNo=${encodeURIComponent(serialNo)}`,
          {
            method: "GET",
            credentials:"include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const videoData = await resVideo.json();
        console.log('Fetched video data:', videoData.data);
        setVideoUrl(videoData.data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
      }
}

const updateTotals = (list: any[]) => {
  if (list && list.length > 0) {
    const qty = list.reduce((sum, item) => {
      const quantity = Number(item.qty ?? item.quantity ?? 0);
      return sum + quantity;
    }, 0);

    const amt = list.reduce((sum, item) => {
      const quantity = Number(item.qty ?? item.quantity ?? 0);
      const price = Number(item.price ?? 0);
      return sum + quantity * price;
    }, 0);

    console.log('qty', qty);
    console.log('amt', amt);

    setTotalQty(qty);
    setTotalAmount(amt);
  } else {
    console.log('qty0', 0);
    console.log('amt0', 0);
    setTotalQty(0);
    setTotalAmount(0);
  }
};


  // const updateTotals = (list: ItemData[]) => {
  //   if (list.length> 0){
  //     const qty = list.reduce((sum, i) => sum + Number(i.qty || i.quantity), 0);
  //       const amt = list.reduce((sum, i) => sum + Number((i.qty || i.quantity) * i.price || 0), 0);
  //       console.log('qty',qty)
  //         console.log('amt',amt)
  //       setTotalQty(qty);
  //       setTotalAmount(amt);
  //   }else{
  //     console.log('qty0',0)
  //         console.log('amt0',0)
  //       setTotalAmount(0)
  //       setTotalQty(0)
  //   }
   
  // };

  const tableHeight = window.innerHeight * 0.95;

  return (
    <div className="MainContainer" style={{ display: "flex", flexDirection: "row", backgroundColor: "#007bff",gap:'10px' }}>
      <div className="Container" style={{ flex: 1, padding: 2 }}>
        {videoUrl && (
          <video
            width="100%"
            height={tableHeight + 14}
            controls
            autoPlay
            loop
            muted
            style={{ border: "3px solid blue", borderRadius: 10, objectFit: "cover" }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="Container" style={{ flex: 1, padding: 5, marginTop:'2px',
 
       backgroundColor:'white' ,border: "3px solid blue", borderRadius: 10,
      }}>
        <div className="table-wrapper" style={{ width: "99.5%", fontSize: 30, borderCollapse: "collapse", border: "3px solid blue", borderRadius: 10,
            height :tableHeight - 180, overflow: "auto"
        }}>

        
        <table style={{ width: "100%", fontSize: 30, borderCollapse: "collapse",

        }}>
          <thead className="sticky-top">
            <tr>
              <th>QTY</th>
              <th>DESCRIPTION</th>
              <th className="price">PRICE</th>
              <th className="amount">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
                {cartItems.length > 0 && cartItems.map((item) => (
              <tr key={item.barcode}>
                <td style={{ textAlign: "center" }}>{item.qty || item.quantity}</td>
                <td>{item.description}</td>
                <td style={{ textAlign: "right" }}>
                {(item.price ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}                </td>
                <td style={{ textAlign: "right" }}>
                 {((item.qty || item.quantity) * item.price).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                </td>
              </tr>
            ))}
            {/* {items.length > 0 && items.map((item) => (
              <tr key={item.barcode}>
                <td style={{ textAlign: "center" }}>{item.qty}</td>
                <td>{item.description}</td>
                <td style={{ textAlign: "right" }}>
                {(item.price ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}                </td>
                <td style={{ textAlign: "right" }}>
                 {(item.amount ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
        </div>
        <div style={{ marginTop: 10, fontSize: 35, fontWeight: "bold" }}>
          <div className="data-container">
            <label>Total Items:</label> 
            <label>{totalQty}</label>
            
          </div>
          <div className="data-container">
            <label>
                  Amount Due:{" "}
            </label>
            <label> 
              {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </label>
           
          </div>
          <div className="data-container">
            <label>Amount Tendered:</label>
            <label>{parseFloat(AmtTendered).toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
              }) || '0.00'}</label>
            </div>
          <div className="data-container">
            <label>
              Change:
            </label>
            <label>
              {parseFloat(Change).toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
              }) ||'0.00'}
            </label>
            
            
            </div>
        </div>
      </div>
    </div>
  );
};

// export default Extended;
// Mount React
// const container = document.getElementById("extended-root") as HTMLElement;
// let root = (container as any)._reactRootContainer;

// if (!root) {
//   root = ReactDOM.createRoot(container);
//   (container as any)._reactRootContainer = root; // store reference
// }
// root.render(
//   <Provider store={store}>
//     <Extended />
//   </Provider>
// );
// root.render(<Extended />);