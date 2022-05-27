
import Responsive from "../../components/common/Responsive";
import CalendarHeaderContainer from "../../containers/calendar/CalendarHeaderContainer";
import HeaderContainer from "../../containers/common/HeaderContainer";
import WriteViewContainer from "../../containers/write/WriteViewContainer";
import AskModalContainer from "../../containers/common/AskModalContainer";
import CalendarViewContainer from "../../containers/calendar/CalendarViewContainer";
import CalendarFormContainer from "../../containers/calendar/CalendarFormContainer";
import CalendarWeekListContainer from "../../containers/calendar/list/CalendarWeekListContainer";
import CalendarMonthListContainer from "../../containers/calendar/list/CalendarMonthListContainer";


const Calendar = () => {
    return (
        <>
            <HeaderContainer />
            <Responsive>
                <CalendarHeaderContainer />
                <CalendarFormContainer>
                    <CalendarMonthListContainer />
                    <CalendarWeekListContainer />
                </CalendarFormContainer>
            </Responsive>
            <AskModalContainer>
                <WriteViewContainer />
                <CalendarViewContainer />
            </AskModalContainer>
        </>
    );
};

export default Calendar;