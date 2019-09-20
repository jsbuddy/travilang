import React, { useState, useRef, useEffect } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import './Translator.scss';

const apikey = 'trnsl.1.1.20190917T093046Z.d50db5a09c116915.0fe7a1d6f7c70aa6035a64bd76f0ab1b3ff4f88b';
const urls = {
  langs: `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${apikey}&ui=en`,
  translate: (sentence, lang) => `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apikey}&text=${sentence}&lang=${lang}&format=plain`,
};

const Translator = () => {
  const [from, setFrom] = useState({ language: 'en', text: '' });
  const [to, setTo] = useState({ language: 'fr', text: '' });
  const [translating, setTranslating] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeout, fromEl] = [useRef(), useRef()];

  const translate = async (sentence, lang) => {
    setTranslating(true);
    const { text } = await (await fetch(urls.translate(sentence, lang), { method: 'GET' })).json();
    setTo({ ...to, text });
    setTranslating(false);
  };

  const handleChange = ({ target: { value: text } }) => {
    clearTimeout(timeout.current);
    setFrom({ ...from, text });
  };

  const getLanguages = async () => {
    setLoading(true);
    const { langs } = await (await fetch(urls.langs, { method: 'GET' })).json();
    setLanguages(langs);
    setLoading(false);
  };

  const setLanguage = async (ref, language) => {
    if (ref === 'from') setFrom({ ...from, language });
    if (ref === 'to') setTo({ ...to, language });
  };

  // eslint-disable-next-line consistent-return
  const copy = () => {
    fromEl.current.focus();
    fromEl.current.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    timeout.current = setTimeout(() => {
      if (!from.text && !from.text.trim()) setTo({ ...to, text: '' });
      else translate(from.text, `${from.language}-${to.language}`);
    }, 1000);
  }, [from.language, to.language, from.text]);

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <>
      {
        loading
          ? 'Loading..'
          : (
            <div className="translator-wrap">
              <div className="from">
                <div className="top">
                  <select name="from" value={from.language} onChange={(e) => setLanguage('from', e.target.value)}>
                    {
                      Object.keys(languages)
                        .map((key) => <option key={key} value={key}>{languages[key]}</option>)
                    }
                  </select>
                </div>
                <textarea placeholder="Type here.." name="from" onChange={handleChange} value={from.text} />
              </div>
              <div className="to">
                <div className="top">
                  <select name="from" value={to.language} onChange={(e) => setLanguage('to', e.target.value)}>
                    {
                      Object.keys(languages)
                        .map((key) => <option key={key} value={key}>{languages[key]}</option>)
                    }
                  </select>
                  {
                    to.text && !copied && (
                      <button className="btn-copy" type="button" onClick={copy}>
                        <FiCopy />
                      </button>
                    )
                  }
                  {
                    to.text && copied && (
                      <span className="copy-success">
                        Copied &nbsp;
                        <FiCheck />
                      </span>
                    )
                  }
                </div>
                <textarea ref={fromEl} name="to" value={`${to.text} ${translating ? '...' : ''}`} readOnly />
              </div>
            </div>
          )
      }
    </>
  );
};

export default Translator;
