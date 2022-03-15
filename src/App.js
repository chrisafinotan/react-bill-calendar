import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App.css";
import "./components/css-components/Calendar.css";
import Calendar from "./components/Calendar/Calendar";
import { Balance } from "./lib/Balance";
import EventCreator from "./components/Event/EventCreator";

import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: "1em",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    // opacity: "0",
    // backgroundColor: "var(--w__font__color)",
    boxShadow: "none",
    backgroundColor: "transparent",
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "3em",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

function App() {
    const [eventsArr, setEvents] = useState([]);
    const getStarting = () => {
        let defaultvalue = 100;
        if (localStorage.getItem("start_balance")) {
            defaultvalue = localStorage.getItem("start_balance");
        } else {
            localStorage.setItem("start_balance", defaultvalue);
        }
        return defaultvalue;
    };

    const [startBalance, setStartBalance] = useState(() => getStarting());
    const [startBalanceDateStart, setStartBalanceDateStart] = useState(dayjs());
    const [startBalanceDateEnd, setStartBalanceDateEnd] = useState(
        dayjs().year(dayjs().year() + 1)
    );

    const [balance, setBalance] = useState(0);
    // const theme = useTheme();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const setStartDate = (val) => {
        setStartBalanceDateStart(val);
    };

    const setEndDate = (val) => {
        setStartBalanceDateEnd(val);
    };

    useEffect(() => {
        setBalance(
            Balance(
                startBalanceDateStart,
                startBalanceDateEnd,
                eventsArr,
                startBalance
            )
        );
        localStorage.setItem("start_balance", startBalance);
    }, [startBalance, eventsArr, startBalanceDateStart, startBalanceDateEnd]);

    return (
        <div className="main__wrapper">
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {open ? (
                        <IconButton
                            color="inherit"
                            aria-label="close drawer"
                            onClick={handleDrawerClose}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <ChevronLeftIcon
                                sx={{
                                    color: "var(--main__font__color)",
                                    fontSize: "2em",
                                }}
                            />
                        </IconButton>
                    ) : (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon
                                sx={{
                                    color: "var(--main__font__color)",
                                    fontSize: "2em",
                                }}
                            />
                        </IconButton>
                    )}
                    <div className="title__wrapper">
                        <div className="title__div">bnb</div>
                        <div className="starting__balance">
                            <div className="balance__span__div">
                                <span className="balance__span__title">
                                    Current: $
                                </span>
                                <input
                                    type='number'
                                    value={Number(startBalance)}
                                    onChange={(e) =>
                                        setStartBalance(Number(e.target.value))
                                    }
                                    className="input__big"
                                ></input>
                            </div>
                            <div
                                className="balance__span__div"
                                style={{ fontSize: "1em" }}
                            >
                                <div className="balance__date__div">
                                    <span className="balance__date">
                                        Start Date
                                    </span>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <div>
                                            <DatePicker
                                                label="Date"
                                                value={startBalanceDateStart}
                                                onChange={(newValue) => {
                                                    setStartDate(
                                                        new Date(newValue)
                                                    );
                                                }}
                                                autoWidth
                                                renderInput={(params) => (
                                                    <TextField
                                                        sx={{
                                                            border: "1px solid var(--main__font__color)",
                                                            borderRadius:
                                                                "0.5em",
                                                            "& div": {
                                                                color: "var(--main__font__color)",
                                                            },
                                                            "& label": {
                                                                color: "var(--main__font__color)",
                                                                display: "none",
                                                            },
                                                            "& svg": {
                                                                color: "var(--main__font__color)",
                                                            },
                                                        }}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </div>
                                <div className="balance__date__div">
                                    <span className="balance__date">
                                        End Date
                                    </span>
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                    >
                                        <div>
                                            <DatePicker
                                                label="Date"
                                                value={startBalanceDateEnd}
                                                onChange={(newValue) => {
                                                    setEndDate(
                                                        new Date(newValue)
                                                    );
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        sx={{
                                                            border: "1px solid var(--main__font__color)",
                                                            borderRadius:
                                                                "0.5em",
                                                            "& div": {
                                                                color: "var(--main__font__color)",
                                                            },
                                                            "& label": {
                                                                color: "var(--main__font__color)",
                                                                display: "none",
                                                            },
                                                            "& svg": {
                                                                color: "var(--main__font__color)",
                                                            },
                                                        }}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "var(--p__font__color)",
                    },
                    "& .MuiDrawer-paper::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div className="drawer__div">
                    <DrawerHeader />
                    <EventCreator
                        eventsArr={eventsArr}
                        setEvents={setEvents}
                    ></EventCreator>
                </div>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Calendar events={balance} />
            </Main>
        </div>
    );
}

export default App;
