{/* <Dialog PaperProps={{
    style: {height: '500px',width:'500px' , top: '0%',overflow: "hidden",}
     }} open={OpenAcctTitleModal} onClose={handleClose}>
        <div
            style={{position: "sticky",
                    top: 0,
                    background: "white",
                    zIndex: 10,
                    display: "flex",
                    flexDirection:'column',
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #ddd",}}
                                                    >
                    <Box sx={{display:'flex',flexDirection:'row',gap:'10px'}}>
                        <Typography variant="h6" style={{ flex: 1,textAlign:'center' ,
                            backgroundColor:'blue',color:'white',width:'100%'
                            }}> Select Account Title
                        </Typography>
                            <Tooltip title="Delete" onClick={handleClose}>
                            <IconButton color="error" >
                            <CloseIcon />
                            </IconButton>
                            </Tooltip>  
                    </Box>
            </div>
             <div  style={{height: '500px',width:'500px' ,  top: '0%',  overflow: "auto" }}>
            <List>
                {AcctTitleList.length > 0 && AcctTitleList.map((title:any,index:any) => (
                    <ListItem key={title.acct_title}
                        disablePadding
                        ref={(el) => (listItemRefs.current[index] = el)}
                        onClick={() =>{ handleSelect(index)}}>

                        <ListItemButton
                            onKeyDown={(e)=>handleKeyDownList(e)}
                            selected={selectedIndex === index} // built-in MUI selected style
                            sx={{backgroundColor: selectedIndex === index ? "blue !important" : "transparent",
                             "&.Mui-selected": { backgroundColor: "#4070FF !important",}, "&:hover": {
                            backgroundColor: selectedIndex === index ? "blue !important" : "#f5f5f5", } }}
                            style={{color:'white'}}>
                        <ListItemText
                            primaryTypographyProps={{
                            sx: {color: selectedIndex === index ? "white" : "black",},
                            }} primary={title.acct_title} />
                        </ListItemButton>
                    </ListItem>
                 ))}
                </List>
            </div>
        </Dialog> */}