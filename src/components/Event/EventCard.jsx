import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const EventCard = ({ showCard, addNewRepeat, addNewSingle, input }) => {
    const monthDays = Array.from({ length: 31 }, (_, i) => i + 1)

    const [singleEName, setSingleEName] = useState("");
    const [singleEDate, setSingleEDate] = useState(null);
    const [singleEAmount, setSingleEAmount] = useState(0);

    const [repeatingEName, setRepeatingEName] = useState("");
    const [repeatingEDate, setRepeatingEDate] = useState(null);
    const [repeatingEDate2, setRepeatingEDate2] = useState(null);
    const [repeatingEAmount, setRepeatingEAmount] = useState(0);
    const [repeatingEFreq, setRepeatingEFreq] = useState(1);
    const [repeatingEWeekly, setRepeatingEWeekly] = useState(() => [0]);
    const [repeatingEMonthly, setRepeatingEMonthly] = useState(() => [1]);
    const [repeatingEYearly, setRepeatingEYearly] = useState(() => [0]);

    const [tabValue, setTabValue] = useState('repeating');

    const [repeatType, setRepeatType] = useState('Daily');
    const [eventType, setEventType] = useState('Credit');
    const [ready, setReady] = useState(false)

    const changeRepeatType = (event) => {
        setRepeatType(event.target.value);
    };

    const changeEventType = (event) => {
        setEventType(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        if (!input)
            setTabValue(newValue);
    };

    const handleSelectWeekly = (event, selectedDays) => {
        if (selectedDays.length) {
            setRepeatingEWeekly(selectedDays);
        }
    }

    const handleSelectMonthly = (event, selectedDays) => {
        if (selectedDays.length) {
            setRepeatingEMonthly(selectedDays);
        }
    }


    const getRepeatTypeInput = () => {
        let returnDiv;
        switch (repeatType) {
            case 'Daily':
                returnDiv = (
                    <div>
                        <div>
                            Frequency
                        </div>
                        <div>
                            <input value={repeatingEFreq} type='number' onChange={e => setRepeatingEFreq(e.target.value)}></input>
                        </div>
                    </div>
                )
                break;
            case 'Weekly':
                returnDiv = (
                    <div>
                        <div>
                            <div>
                                Frequency
                            </div>
                            <div>
                                <input value={repeatingEFreq} type='number' onChange={e => setRepeatingEFreq(e.target.value)}></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                Days
                            </div>
                            <ToggleButtonGroup
                                value={repeatingEWeekly}
                                onChange={handleSelectWeekly}
                                aria-label="device"
                                className='weeklyEventSelect'
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gridAutoFlow: 'row',
                                }}
                            >
                                <ToggleButton value={0} aria-label="SUN_BTN">
                                    SUN
                                </ToggleButton>
                                <ToggleButton value={1} aria-label="MON_BTN">
                                    MON
                                </ToggleButton>
                                <ToggleButton value={2} aria-label="TUE_BTN">
                                    TUE
                                </ToggleButton>
                                <ToggleButton value={3} aria-label="WED_BTN">
                                    WED
                                </ToggleButton>
                                <ToggleButton value={4} aria-label="THU_BTN">
                                    THU
                                </ToggleButton>
                                <ToggleButton value={5} aria-label="FRI_BTN">
                                    FRI
                                </ToggleButton>
                                <ToggleButton value={6} aria-label="SAT_BTN">
                                    SAT
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                )
                break;
            case 'Monthly':
                returnDiv = (
                    <div>
                        <div>
                            <div>
                                Frequency
                            </div>
                            <div>
                                <input value={repeatingEFreq} type='number' onChange={e => setRepeatingEFreq(e.target.value)}></input>
                            </div>
                        </div>
                        <div>
                            <div>
                                Days
                            </div>
                            <ToggleButtonGroup
                                value={repeatingEMonthly}
                                onChange={handleSelectMonthly}
                                aria-label="device"
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gridAutoFlow: 'row',
                                }}
                            >
                                {monthDays.map(el => {
                                    return (
                                        <ToggleButton value={el} aria-label={`${el}_BTN`}>
                                            {el}
                                        </ToggleButton>
                                    )
                                })}
                            </ToggleButtonGroup>
                        </div>
                    </div>
                )
                break;
            default:
                returnDiv = (
                    <div>
                        <div>
                            Frequency
                        </div>
                        <div>
                            <input value={repeatingEFreq} type='number' onChange={e => setRepeatingEFreq(e.target.value)}></input>
                        </div>
                    </div>
                )
                break;
        }
        return returnDiv;
    }

    const checkFields = () => {
        let answer = true;

        const checkRepeating = () => {
            answer &= repeatingEName === "" ? false : true
            answer &= repeatingEDate === null ? false : true
            answer &= repeatingEDate2 === null ? false : true
            answer &= repeatingEAmount < 0 ? false : (repeatingEAmount === "" ? false : true)
            answer &= repeatingEFreq < 1 ? false : true
        }

        const checkSingle = () => {
            answer &= singleEName === "" ? false : true;
            answer &= singleEDate === null ? false : true;
            answer &= singleEAmount < 0 ? false : (singleEAmount === "" ? false : true)
        }

        switch (tabValue) {
            case 'repeating':
                checkRepeating();
                break;
            case 'single':
                checkSingle();
                break;

        }
        setReady(answer)
    }

    let singleForm = (
        <div>
            {/* NAME */}
            <div>
                <div>
                    NAME
                </div>
                <div>
                    <input disabled={input ? true : false} value={singleEName} onChange={e => setSingleEName(`${e.target.value}`)}></input>
                </div>
            </div>
            {/* TYPE */}
            <div>
                <div>Event Type</div>
                <Select
                    // labelId="demo-simple-select-autowidth-label"
                    // id="demo-simple-select-autowidth"
                    value={eventType}
                    onChange={changeEventType}
                    autoWidth
                    label="Event Type"
                >
                    <MenuItem value={'Credit'}>Credit</MenuItem>
                    <MenuItem value={'Debit'}>Debit</MenuItem>
                </Select>
            </div>
            {/* AMOUNT */}
            <div>
                <div>
                    AMOUNT
                </div>
                <div>
                    <input value={singleEAmount} type='number' onChange={e => setSingleEAmount(e.target.value)}></input>
                </div>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* DATE */}
                <div>
                    <DatePicker
                        label="Date"
                        value={singleEDate}
                        onChange={(newValue) => {
                            setSingleEDate(new Date(newValue));
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
            </LocalizationProvider>
        </div>
    )

    let repeatingForm = (
        <div>
            {/* NAME */}
            <div>
                <div>
                    NAME
                </div>
                <div>
                    <input disabled={input ? true : false} value={repeatingEName} onChange={e => setRepeatingEName(`${e.target.value}`)}></input>
                </div>
            </div>
            {/* TYPE */}
            <div>
                <div>Event Type</div>
                <Select
                    // labelId="demo-simple-select-autowidth-label"
                    // id="demo-simple-select-autowidth"
                    value={eventType}
                    onChange={changeEventType}
                    autoWidth
                    label="Event Type"
                    sx={whiteText}
                >
                    <MenuItem value={'Credit'}>Credit</MenuItem>
                    <MenuItem value={'Debit'}>Debit</MenuItem>
                </Select>
            </div>
            {/* AMOUNT */}
            <div>
                <div>
                    AMOUNT
                </div>
                <div>
                    <input value={repeatingEAmount} type='number' onChange={e => setRepeatingEAmount(e.target.value)}></input>
                </div>
            </div>
            {/* START DATE */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div>
                    <DatePicker
                        label="Start Date"
                        value={repeatingEDate}
                        onChange={(newValue) => {
                            setRepeatingEDate(new Date(newValue));
                        }}
                        renderInput={(params) => <TextField sx={whiteText} {...params} />}
                        sx={whiteText}
                    />
                </div>
                {/* END DATE */}
                <div>
                    <DatePicker
                        label="End Date"
                        value={repeatingEDate2}
                        onChange={(newValue) => {
                            setRepeatingEDate2(new Date(newValue));
                        }}
                        renderInput={(params) => <TextField sx={whiteText} {...params} />}
                        sx={whiteText}
                    />
                </div>
            </LocalizationProvider>
            {/* REPEAT TYPE */}
            <div>
                <FormControl sx={{ m: 1, minWidth: 80, width: 100 }}>
                    <div id="demo-simple-select-autowidth-div">Repeat Type</div>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={repeatType}
                        onChange={changeRepeatType}
                        autoWidth
                        label="Repeat Type"
                        sx={whiteText}
                    >
                        <MenuItem sx={whiteText} value={'Daily'}>Daily</MenuItem>
                        <MenuItem sx={whiteText} value={'Weekly'}>Weekly</MenuItem>
                        <MenuItem sx={whiteText} value={'Monthly'}>Monthly</MenuItem>
                        <MenuItem sx={whiteText} value={'Yearly'}>Yearly</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* FREQUENCY */}
            <div>
                {getRepeatTypeInput()}
            </div>
        </div>
    )

    const generateEvent = (type) => {
        if (type === 'single') {
            let newSingleEvent = {
                amount: Number(singleEAmount),
                event_class: eventType,
                date: singleEDate,
                name: singleEName,
                type: "single",
            }
            addNewSingle(newSingleEvent)
        }
        else {
            let newRepeatingEvent = {
                amount: Number(repeatingEAmount),
                event_class: eventType,
                name: repeatingEName,
                type: "repeating",
                start: repeatingEDate,
                end: repeatingEDate2,
                repeatParams: [repeatType, Number(repeatingEFreq), repeatingEWeekly, repeatingEMonthly, repeatingEYearly],
            }
            addNewRepeat(newRepeatingEvent)
        }
        showCard(false)
    }

    useEffect(() => {
        checkFields()
    }, [tabValue, singleEDate, singleEAmount, singleEName, repeatingEDate, repeatingEDate2, repeatingEFreq, repeatingEAmount, repeatingEName, eventType])

    useEffect(() => {
        if (input) {
            if (input.type === 'repeating') {
                setRepeatingEName(input.name);
                setRepeatingEDate(new Date(input.start));
                setRepeatingEDate2(new Date(input.end));
                setRepeatingEAmount(input.amount);
                setRepeatingEFreq(input.repeatParams[1]);
                setRepeatingEWeekly(() => input.repeatParams[2]);
                setRepeatingEMonthly(() => input.repeatParams[3]);
                setRepeatingEYearly(() => input.repeatParams[4]);
                setRepeatType(input.repeatParams[0]);
                setEventType(input.event_class);
                setTabValue('repeating');
            } else {
                setSingleEName(input.name);
                setSingleEDate(new Date(input.date))
                setSingleEAmount(input.amount)
                setEventType(input.event_class);
                setTabValue('single');
            }
        }
    }, [input])



    return (
        <div className='event__card'>
            <div className='event__card__tabs'>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    // textColor="secondary"
                    // indicatorColor="secondary"
                    aria-label="event card tabs"
                // sx={{
                //     // backgroundColor: 'var(--primary-bg-color)',
                //     // border: '2px solid var(--main-bg-border-color)',
                // }}
                >
                    <Tab sx={whiteText} value="single" label="Single" />
                    <Tab sx={whiteText} value="repeating" label="Repeating" />
                </Tabs>
            </div>
            {
                tabValue === 'single' ?
                    singleForm : repeatingForm
            }

            <div>
                <button onClick={() => showCard(false)}>CANCEL</button>
                <button disabled={!ready} onClick={() => generateEvent(tabValue)}>OK</button>
            </div>
        </div>
    )
}

export default EventCard

const whiteText = {
    color: 'var(--main-bg-color)',
    border: '2px solid var(--main-bg-border-color)',
}