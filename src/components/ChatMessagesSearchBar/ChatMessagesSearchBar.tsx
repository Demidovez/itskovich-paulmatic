import parse from 'html-react-parser';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Input } from 'reactstrap';

import { useLazySearchChatQuery } from '~src/store/api/inbox';
import { setSearchedMessage } from '~src/store/slices/inboxSlice';

import './ChatMessagesSearchBar.scss';

const ChatMessagesSearchBar = ({ className = '' }) => {
  const dispatch = useDispatch();

  const [ result, setResult ] = useState({ items: []});
  const [ searchMessages, { data: messages, isFetching } ] =
    useLazySearchChatQuery();
  const [ isShowResult, setIsShowResult ] = useState(false);
  const ModifiedTime = useSelector((state) => state.common.Chats.ModifiedTime);
  const [ searchValue, setSearchValue ] = useState('');

  const startSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  useEffect(() => {
    if (searchValue.length >= 4) {
      searchMessages({ Body: searchValue });
    } else {
      setResult({ items: []});
    }
  }, [ searchValue, ModifiedTime ]);

  useEffect(() => {
    if (!isFetching) {
      setResult({ items: messages || []});
    }
  }, [isFetching]);

  useEffect(() => {
    if (result.items.length) {
      setTimeout(() => setIsShowResult(true), 200);
    } else {
      setIsShowResult(false);
    }
  }, [result.items.length > 0]);

  const goToChat = (message) => {
    dispatch(setSearchedMessage(message));
  };

  const getWrappedText = (body, plainBodyShort) => {
    const cleanedBody = body.replace(/(<([^>]+)>)/gi, '');

    const indexOfStartSearchValue = cleanedBody
      .toLowerCase()
      .indexOf(searchValue.toLowerCase());
    const indexOfEndSearchValue = indexOfStartSearchValue + searchValue.length;
    const labelSearchValue = cleanedBody.slice(
      indexOfStartSearchValue,
      indexOfEndSearchValue,
    );

    if (indexOfStartSearchValue === -1) {
      return plainBodyShort.replace(/(<([^>]+)>)/gi, '');
    }

    const textBeforeSearchValue = cleanedBody.slice(
      Math.max(indexOfStartSearchValue - 50, 0),
      indexOfStartSearchValue,
    );

    const textAfterSearchValue =
      indexOfEndSearchValue === cleanedBody.length - 1
        ? ''
        : cleanedBody.slice(
          indexOfEndSearchValue,
          Math.min(indexOfEndSearchValue + 50, cleanedBody.length),
        );

    const wrappedText = `${
      textBeforeSearchValue.length < 50 ? '' : '...'
    }${textBeforeSearchValue}<span class="search-value">${labelSearchValue}</span>${textAfterSearchValue}${
      textAfterSearchValue.length < 50 ? '' : '...'
    }`;

    return parse(wrappedText);
  };

  const getWrappedName = (name) => {
    const cleanedBody = name.replace(/(<([^>]+)>)/gi, '');

    const indexOfStartSearchValue = cleanedBody
      .toLowerCase()
      .indexOf(searchValue.toLowerCase());
    const indexOfEndSearchValue = indexOfStartSearchValue + searchValue.length;
    const labelSearchValue = cleanedBody.slice(
      indexOfStartSearchValue,
      indexOfEndSearchValue,
    );

    if (indexOfStartSearchValue === -1) {
      return name.replace(/(<([^>]+)>)/gi, '');
    }

    const wrappedText = cleanedBody.replace(
      labelSearchValue,
      `<span class="search-value">${labelSearchValue}</span>`,
    );

    return parse(wrappedText);
  };

  return (
    <div
      className={`chat-messages-search-bar-component d-flex align-items-center ${className}`}
    >
      <div className="pl-2 pr-0">
        <MdOutlineSearch size="1.5rem" />
      </div>
      <Input
        placeholder="Поиск сообщений..."
        className="border-0"
        id="searchbar"
        type="search"
        style={{ background: 'none' }}
        value={searchValue}
        onChange={(e) => startSearch(e.target.value)}
        autoComplete="off"
        onBlur={() => setIsShowResult(false)}
        onFocus={() => setIsShowResult(true)}
      />
      {result.items.length ? (
        <div
          className="result-wrapper"
          style={{
            opacity: isShowResult ? 1 : 0,
            zIndex: isShowResult ? 101 : -1,
          }}
        >
          {[...result.items]
            .sort((i1, i2) => moment(i2.Time) - moment(i1.Time))
            .map((message) => (
              <div
                key={message.id}
                className="result-item"
                onClick={() => goToChat(message)}
              >
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div className="result-user">
                    {getWrappedName(
                      message.Contact.FirstName + ' ' + message.Contact.LastName,
                    )}
                  </div>
                  <div className="result-time">
                    {moment(message.Time).format('DD MMM yy HH:mm')}
                  </div>
                </div>

                <div className="result-preview">
                  {getWrappedText(message.Body, message.PlainBodyShort)}
                </div>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default ChatMessagesSearchBar;
