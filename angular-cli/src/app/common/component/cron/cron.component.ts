import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { CornData } from '../../entity/corn';
import { FormBaseTs } from '../../ts/base/form.base';
/**
 * @name 计时程序
 * @param type 执行模式
 * @param cron 计时程序
 * @param cronLabel 计时程序-lable名称
 * @example 
 * 	<app-cron #cron [type]="" [cron]="" [cronLabel]=""></app-cron>
*/

@Component({
  selector: 'app-cron',
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.less']
})
export class CronComponent extends FormBaseTs implements OnInit {
  constructor(public injuctor: Injector) {
    super(injuctor);
  }
	@Input() type = "";  // 执行模式
	@Input() cron: string = "";  // 计时程序
	@Input() cronLabel: string = "";  // 计时程序-lable名称
	cronData: any = {}; 	// cron解析数据

	// 执行模式
	executeType = "";
	executeTypeList = [];
	// 执行模式-周期执行
	cycleTaskType = "";
	cycleTaskTypeList = [];
	// 执行模式-周期执行-年、季度、周、日
  yearList = [];
  quarterList = [];
	weekList  = [];
  dayList = [];

  ngOnInit() {
    this.form = this.fb.group({
			executeType: [null, [Validators.required]],
			cycleType: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.executeType === 'SCHEDULE'){  // 执行模式-周期执行：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			year: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.cycleTaskType === 'year'){  // 执行模式-周期执行-每年：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			quarter: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.cycleTaskType === 'quarter'){  // 执行模式-周期执行-每季度：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			month: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.cycleTaskType === 'quarter' || this.cycleTaskType === 'month'){  // 执行模式-周期执行-每季度、每月：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			week: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.cycleTaskType === 'week'){  // 执行模式-周期执行-每周：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			time: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.executeType === 'SCHEDULE'){  // 执行模式-周期执行：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]],
			executeTime: [null, [(control: FormControl): ValidationErrors | null => {
				if(this.executeType === 'DELAY'){  // 执行模式-定时执行：必填
					if (control.value == null || control.value.length === 0) {
						return {required: true};
					}
				};
				return null;
			}]]
    });
		this.toDataFn();
		this.getCodeList();
  }

	// 码表信息
	async getCodeList(fn?: Function) {
		// 执行模式、执行模式-周期执行
		//await this.code.promise();
		//this.executeTypeList = this.code.list['executeType'];
		this.executeTypeList = [
			{key: "IMMEDIATE", value: "立即执行"},
			{key: "DELAY", value: "定时执行"},
			{key: "SCHEDULE", value: "周期执行"}
		];
		//this.cycleTaskTypeList = this.code.list['cycleTaskType']
		this.cycleTaskTypeList = [
			{key: "day", value: "每天"},
			{key: "week", value: "每周"},
			{key: "month", value: "每月"},
			{key: "quarter", value: "每季度"},
			{key: "year", value: "每年"}
		];
		// 执行模式-周期执行-每日、每月
		let day28 = [], day30 = [], day31 = [];
		for (let i = 1; i <= 31; i++) {
			if (i <= 28) day28.push({ label: i + '', value: i + '', isLeaf: true });
			if (i <= 30) day30.push({ label: i + '', value: i + '', isLeaf: true });
			day31.push({ label: i + '', value: i + '', isLeaf: true });
			this.dayList.push({ label: i + '', value: i + '', checked: false });
		}
		for (let i = 1; i <= 12; i++) {
			if (i == 2) {
				this.yearList.push({ label: i + '', value: i + '', children: day28 })
				continue;
			}
			if ((i <= 7 && i % 2 == 0) || (i >= 8 && i % 2 == 1)) {
				this.yearList.push({ label: i + '', value: i + '', children: day30 })
			}
			if ((i <= 7 && i % 2 == 1) || (i >= 8 && i % 2 == 0)) {
				this.yearList.push({ label: i + '', value: i + '', children: day31 })
			}
		}
		// 执行模式-周期执行-每季度、每周
		await this.i18n.promise();
		this.quarterList = [
			{value: this.i18n.list.cron.firstMonth, key: "1,4,7,10"},
			{value: this.i18n.list.cron.secondMonth, key: "2,5,8,11"},
			{value: this.i18n.list.cron.thirdMonth, key: "3,6,9,12"}
		];
		this.weekList = [
			{ label: this.i18n.list.cron.monday, value: '2', checked: false },
			{ label: this.i18n.list.cron.tuesday, value: '3', checked: false },
			{ label: this.i18n.list.cron.wednesday, value: '4', checked: false },
			{ label: this.i18n.list.cron.thursday, value: '5', checked: false },
			{ label: this.i18n.list.cron.friday, value: '6', checked: false },
			{ label: this.i18n.list.cron.saturday, value: '7', checked: false },
			{ label: this.i18n.list.cron.sunday, value: '1', checked: false }
		];
	}

	// 解析cron表达式
	toDataFn() {
		if (this.cron) {
			const array = this.cron.split(" ") || [];
			if (array.length) {
				const time = new Date(),
					hour = array[2],
					minute = array[1],
					second = array[0];
				time.setHours(Number(hour));
				time.setMinutes(Number(minute));
				time.setSeconds(Number(second));
				// year
				if (array[3] != "*" && array[4] != "*" && array[5] == "?" && array.length != 7) {
					this.cronData = { time: time, day: array[3], month: array[4], type: "year" };
				}
				// quarter
				if (this.cron.endsWith(" ?") && array[4].length > 1) {
					this.cronData = { time: time, day: array[3], quarter: array[4], type: "quarter" };
				}
				// month
				if (this.cron.endsWith("* ?")) {
					this.cronData = { time: time, day: array[3], type: "month" };
				}
				// week
				if (array[5] != "?" && array[3] == "?" && array[4] == "*") {
					this.cronData = { time: time, week: array[5], type: "week" };
				}
				// day
				if (this.cron.endsWith("* * ?")) {
					this.cronData = { time: time, type: "day" };
				}
				//regular
				if (array.length == 7) {
					const year = Number(array[6].split("-")[0]);
					time.setDate(Number(array[3]));
					time.setMonth(Number(array[4]) - 1);
					time.setFullYear(year);
					this.cronData = { date: time, type: "regular" };
				}
			}
		}
	}
  // 转为corn表达式
  toCronFn (data: CornData, type: string): string {
    const blankSpace = " ",
			hour = data.time.getHours(),
			minute = data.time.getMinutes(),
			second = data.time.getSeconds();
		switch (type) {
			case 'year':
				return (
					second +
					blankSpace +
					minute +
					blankSpace +
					hour +
					blankSpace +
					data.moth[1] +
					blankSpace +
					data.moth[0] +
					" ?"
				);
				break;
			case 'quarter':
				return (
					second +
					blankSpace +
					minute +
					blankSpace +
					hour +
					blankSpace +
					data.day +
					blankSpace +
					data.quarter + 
					" ?"
				);
				break;
			case 'month':
				return (
					second +
					blankSpace +
					minute +
					blankSpace +
					hour +
					blankSpace +
					data.day +
					" * ?"
				);
				break;
			case 'week':
				return (
					second +
					blankSpace +
					minute +
					blankSpace +
					hour +
					" ? *" +
					blankSpace +
					data.week
				);
				break;
			case 'day':
				return second + blankSpace + minute + blankSpace + hour + " * * ?";
				break;
			case 'regular':
				const mouth = data.date.getMonth() + 1;
      return (
        data.date.getSeconds() +
        blankSpace +
        data.date.getMinutes() +
        blankSpace +
        data.date.getHours() +
        blankSpace +
        data.date.getDate() +
        blankSpace +
        mouth +
        " ? " +
        data.date.getFullYear() +
        "-" +
        data.date.getFullYear()
      );
				break;
			default:
				return "";
				break;
		};
  }

	// 选择-执行模式
	selectExecuteType(event){
		this.executeType = event;
		if(event === 'SCHEDULE'){
      this.form.get("time").setValue(this.cronData.time || new Date());
    } else {
			this.form.get("time").setValidators(null);
		}
	}
  // 选择-执行模式-周期执行-每季度、每月、每周
	selectList(type, event){
    let values = []
    event.forEach(item => {
      if(item.checked){
        values.push(item.value)
      }
    })
    if(values.length){
      this.form.get(type).setValue(values)
    } else {
      this.form.get(type).setValue(null)
    }
  }
	setSelectList(checked: any[], data: any[]) {
    for (let i = 0; i < data.length; i++) {
      if (checked.indexOf(data[i].value) != -1) {
        data[i].checked = true;
      }
    }
  }
  getSelectList(data: any[]) {
    let r = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i].checked) {
        r = r + data[i].value + ','
      }
    }
    return r.substring(0, r.length - 1);
  }

  saveFn(pForm, okFn: Function) {
		// 更新验证规则，统一写在前面（valid更改时会出现验证规则更新不及时的bug）
    for (const i in pForm.controls) {
      pForm.controls[i].markAsDirty();
      pForm.controls[i].updateValueAndValidity();
    }
		for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
		if (pForm.valid && this.form.valid) {
			let cron = '';
			// 执行模式-定时执行、周期执行
			if(this.executeType === 'DELAY'){
				if(this.form.value.executeTime){
					cron = this.toCronFn({
						time: new Date(this.form.value.executeTime),
						date: new Date(this.form.value.executeTime)
					}, 'regular')
				}
			} else if(this.executeType === 'SCHEDULE'){
				if(this.cycleTaskType && this.form.value.time){
					cron = this.toCronFn({
						time: this.form.value.time,
						quarter: this.form.value.quarter || '',
						week: this.getSelectList(this.weekList),
						day: this.getSelectList(this.dayList),
						moth: this.form.value.year,
					}, this.cycleTaskType)
				}
			}
      okFn?.(cron);
    }
  }

  async resetFn(confirm, okFn?: Function) {
		await this.promise();
		this.reset(confirm, () => {
			this.form.reset();
			this.form.controls.executeType.setValue(this.type);
			this.cycleTaskType = this.cronData?.type || "";
			this.form.get("cycleType").setValue(this.cycleTaskType);
			switch (this.cycleTaskType) {
				case 'year':
					this.form.get("year").setValue([this.cronData.month, this.cronData.day])
					this.form.get("time").setValue(this.cronData.time)
					break;
				case 'quarter':
					this.setSelectList(this.cronData.day.split(','), this.dayList);
					this.form.get("quarter").setValue(this.cronData.quarter);
					this.form.get("month").setValue(this.cronData.day.split(','))
					this.form.get("time").setValue(this.cronData.time)
					break;
				case 'month':
					this.setSelectList(this.cronData.day.split(','), this.dayList);
					this.form.get("month").setValue(this.cronData.day.split(','))
					this.form.get("time").setValue(this.cronData.time)
					break;
				case 'week':
					this.setSelectList(this.cronData.week.split(','), this.weekList);
					this.form.get("week").setValue(this.cronData.week.split(','))
					this.form.get("time").setValue(this.cronData.time)
					break;
				case 'day':
					this.form.get("time").setValue(this.cronData.time)
					break;
				case 'regular':
					this.form.get("executeTime").setValue(this.cronData.date)
					break;
				default:
					break;
			};
			okFn?.();
		});
  }

	// 码表加载完毕
	promise() {
		return new Promise((resolve, reject) => {
			let timer = setInterval(() => {
				if (this.cycleTaskTypeList.length && this.weekList.length) {
					clearInterval(timer);
					resolve(true);
				}
			}, 500);
    });
  }
	
}
