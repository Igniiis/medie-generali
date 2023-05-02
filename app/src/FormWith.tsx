import React, { useState } from "react";
import '../src/css/buttons.css';
import OpenLink from "./OpenLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../src/css/form.css';

interface Matter {
  name: string;
  coefficient: string;
}

interface Group {
  name: string;
  coefficient: string;
  matters: Matter[];
}

interface FormValues {
  groups: Group[];
}

const FormWith = () => {

  const [showButtons, setShowButtons] = useState(false);
  const [url,setUrlLoad] = useState('');
  const [values, setValues] = useState<FormValues>({
    groups: [{
      name: "",
      coefficient: "",
      matters: [{ name: "", coefficient: "" }]
    }]
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = event.target;
    const groupIndex:number = Number(dataset.groupIndex!);
    const matterIndex = parseInt(dataset.matterIndex!, 10) as number;

    const group = values.groups[groupIndex];
    const matter = group.matters[matterIndex];

    const newMatter = {
      ...matter,
      [name]: value
    };

    const newMatters = [...group.matters];
    newMatters[matterIndex] = newMatter;

    const newGroup = {
      ...group,
      matters: newMatters
    };

    const newGroups = [...values.groups];
    newGroups[groupIndex] = newGroup;

    setValues({ ...values, groups: newGroups });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmpty = values.groups.every((group) => {
      return !group.matters.some((matter) => matter.name || matter.coefficient) && !group.name && !group.coefficient;
    });

    if(values.groups.length === 0 || isEmpty){
      console.log('no matters or groups declared');
    }else{
      let url = '';
      let t = false;

      values.groups.forEach((group, groupIndex) => {
        group.matters.forEach((matter, matterIndex) => {
          if(t){
            url+= ',';
          }else{
            t=true;
          }
          url += group.name + '-' + matter.name + ":" + matter.coefficient.replace(',','!').replace('.','!');
        });
      });

      const currentUrl = window.location.href;

      url = '?page=calculator&subjects=' + url;

      setUrlLoad(url);

      setShowButtons(true);
    }
  };

  const addNewGroup = () => {
    const newGroup: Group = {
      name: "",
      coefficient: "",
      matters: [{ name: "", coefficient: "" }]
    };
    setValues({
      ...values,
      groups: [...values.groups, newGroup]
    });
    setShowButtons(false);
  };

  const removeGroup = (name: string) => {
    const filteredValues = {
      groups: values.groups.filter((group) => group.name !== name)
    };
    setValues(filteredValues);
    setShowButtons(false);
  };

  const addNewMatter = (groupIndex: number) => {
    const newMatter: Matter = {
      name: "",
      coefficient: ""
    };

    const group = values.groups[groupIndex];
    const newMatters = [...group.matters, newMatter];
    const newGroup = { ...group, matters: newMatters };
    const newGroups = [...values.groups];
    newGroups[groupIndex] = newGroup;

    setValues({
      ...values,
      groups: newGroups
    });
    
  };

  return (
    <form className="form-with" onSubmit={handleSubmit}>
      {values.groups.map((group, groupIndex) => {
        return (
        <div key={groupIndex}>
          <input
            type="text"
            name="name"
            value={group.name}
            placeholder="Group name"
            data-group-index={groupIndex}
            onChange={handleInputChange}
            />
          <input
            type="text"
            name="coefficient"
            value={group.coefficient}
            placeholder="Group coefficient"
            data-group-index={groupIndex}
            onChange={handleInputChange}
            />
          <div>
            {group.matters.map((matter, matterIndex) => {
              return (
                <div key={matterIndex}>
                  <input
                    type="text"
                    name="name"
                    value={matter.name}
                    placeholder="Matter name"
                    data-group-index={groupIndex}
                    data-matter-index={matterIndex}
                    onChange={handleInputChange}
                    />
                  <input
                    type="text"
                    name="coefficient"
                    value={matter.coefficient}
                    placeholder="Matter coefficient"
                    data-group-index={groupIndex}
                    data-matter-index={matterIndex}
                    onChange={handleInputChange}
                    />
                </div>
              );
            })}
        
            <button
              type="button"
              onClick={() => addNewMatter(groupIndex)}
              className="add-matter-btn" >
              + Add Matter
            </button>
        
            <button
              type="button"
              onClick={() => removeGroup(group.name)}
              className="remove-group-btn" >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        );
      })}
      <button type="submit" className="submit-btn">
        Submit
      </button>
      {!showButtons ? (
        <button type="button" onClick={addNewGroup} className="add-group-btn">
          + Add Group
        </button>
      ) : (
        <div className="open-link">
          <OpenLink url={url} />
        </div>
      )}
    </form>
    );
    };
    
    export default FormWith;
