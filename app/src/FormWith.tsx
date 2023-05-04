import React, { useState } from "react";
import '../src/css/buttons.css';
import OpenLink from "./OpenLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../src/css/form.css';

interface Matter {
  name: string;
  coefficient: string;
}

interface Group {
  name: string;
  coefficient: string;
  matters: Matter[];
  visible: boolean;
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
      matters: [{ name: "", coefficient: "" }],
      visible:true
    }]
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, dataset } = event.target;
    const groupIndex:number = Number(dataset.groupIndex!);
    const matterIndex = parseInt(dataset.matterIndex!, 10) as number;
    

    const group = values.groups[groupIndex];
    const matter = group.matters[matterIndex];


    let newGroup;
    if(dataset.matterIndex){
      const newMatter = {
        ...matter,
        [name]: value
      };

      const newMatters = [...group.matters];
      newMatters[matterIndex] = newMatter;

      newGroup = {
        ...group,
        matters: newMatters
      };
    }else{
      const newMatter = {
        ...matter
      };

      const newMatters = [...group.matters];
      newMatters[matterIndex] = newMatter;

      newGroup = {
        ...group,
        [name]:value,
        matters: newMatters
      };

    }

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
      let verif:boolean = true;
      values.groups.forEach(group => {
        if(group.matters.length===0 || group.matters[0].name==='' || group.matters[0].coefficient===''){
          console.log('missing a matter');
          verif = false;
          return;
        }
      });

      
      if(verif){
        let url = '';
        let t1 = false;
        let t2 = false;
        let groupUrl = '';
        let matterUrl = '';

        //TODO
        //verif GradeCalculatorWith to respect THIS url + verif the generation of this specific url
        //group url
        //?page=calculator&groups=Science:math(1!5)|physic(4)~2,Human%20Sciences:English(2!5)|Art(3)~2!5

        values.groups.forEach((group, groupIndex) => {
        if(t1){
          url+= ',';
        }else{
          t1=true;
        }          
    
          url += group.name + ':';
          group.matters.forEach((matter, matterIndex) => {
            if(t2){
              url+= '|';
            }else{
              t2=true;
            }
            url += matter.name + "(" + matter.coefficient.replace(',','!').replace('.','!') + ")";
          });
          url += '~' + group.coefficient;
        });

        const currentUrl = window.location.href;

        url = '?page=calculator&groups=' + url;

        setUrlLoad(url);

        setShowButtons(true);
      }
    }
  };

  const addNewGroup = () => {
    const newGroup: Group = {
      name: "",
      coefficient: "",
      matters: [{ name: "", coefficient: "" }],
      visible:true
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
    
    setShowButtons(false);
  };


  const removeMatter = (name: string, groupIndex: number) => {
    const group = values.groups[groupIndex];
    const newMatters = group.matters.filter((matter) => matter.name !== name);
    const newGroup = { ...group, matters: newMatters };
    const newGroups = [...values.groups];
    newGroups[groupIndex] = newGroup;
    setValues({
      ...values,
      groups: newGroups
    });

    setShowButtons(false);
  };

  const switchVisibility = (groupIndex:number) => {
    values.groups[groupIndex].visible = !values.groups[groupIndex].visible;

    setValues({
      ...values
    });
  }
  

  return (
    <form className="form-with" onSubmit={handleSubmit}>
      {values.groups.map((group, groupIndex) => {
        return ( 
        <div key={groupIndex}>
          <div className="dropDown" onClick={() => switchVisibility(groupIndex)}>
            <FontAwesomeIcon icon={faEyeSlash} style={{display : group.visible ? "block":"none"}}/>
            <FontAwesomeIcon icon={faEye} style={{display : group.visible ? "none":"block"}}/>
          </div>
          <div className="groupWrapper" style={{display : group.visible ? "block":"none"}}>
            <label htmlFor={`group_${groupIndex}`}>Group:</label>
            
            <input
              className="GroupName"
              id={`group_${groupIndex}`}
              type="text"
              name="name"
              value={group.name}
              placeholder="Group name"
              data-group-index={groupIndex}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="coefficient"
              value={group.coefficient}
              placeholder="Group coefficient"
              data-group-index={groupIndex}
              onChange={handleInputChange}
              required
            />
            <div>
              {group.matters.map((matter, matterIndex) => {
                return (
                  <div key={matterIndex}>
                    <label className="subTitle" htmlFor={`matter_${matterIndex}`}>Matter's name:</label>
                    <input
                      id={`matter_${matterIndex}`}
                      type="text"
                      name="name"
                      value={matter.name}
                      placeholder="Matter name"
                      data-group-index={groupIndex}
                      data-matter-index={matterIndex}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="subTitle" htmlFor={`coeff_${matterIndex}`}>Matter's coefficient:</label>
                    <div className="coeff">
                      <input
                        id={`coeff_${matterIndex}`}
                        type="text"
                        name="coefficient"
                        value={matter.coefficient}
                        placeholder="Matter coefficient"
                        data-group-index={groupIndex}
                        data-matter-index={matterIndex}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="deleteButton" onClick={() => removeMatter(matter.name, groupIndex)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </div>
                    </div>
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
        </div>
        );
      })}
      <button type="submit" className="submit-btn">
        Submit
      </button>
      <button type="button" onClick={addNewGroup} className="add-group-btn">
          + Add Group
        </button>
      {!showButtons ? (
        null
      ) : (
        <div className="open-link">
          <OpenLink url={url} />
        </div>
      )}
    </form>
    );
    };
    
    export default FormWith;
