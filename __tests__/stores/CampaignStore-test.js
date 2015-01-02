jest.dontMock('../../src/stores/CampaignStore.js');
//jest.dontMock('../../actions/CampaignStepsActions');
jest.dontMock('reflux');


//jest.autoMockOff();

describe('CampaignStore', function() {

	var CampaignStore;
	var mockCampaignData;
	// var CampaignStepsActions = require('../../actions/CampaignStepsActions');
	beforeEach(function() {
		CampaignStore = require('../../src/stores/CampaignStore.js');
		// console.log(CampaignStore);
		mockCampaignData = {
			id: 'b943158b-a1ce-4fb8-9da8-1fba91c1cb01',
			steps: [
				{
					campaignId: 'b943158b-a1ce-4fb8-9da8-1fba91c1cb01',
					count: 2,
					id: '456c18ee-678e-4bfe-b0af-7e98ab60e67b',
					realmId: '34bd8c2c-354b-427a-855d-6897d91db8b2',
					type: 'wait',
					unit: 'minutes'
				},
				{
					campaignId: "b943158b-a1ce-4fb8-9da8-1fba91c1cb02",
					count: 2,
					hour: 8,
					id: "456c18ee-678e-4bfe-b0af-7e98ab60e67c",
					minute: 30,
					realmId: "34bd8c2c-354b-427a-855d-6897d91db8b2",
					type: "wait",
					unit: "days"
				},
				{
					campaignId: "b943158b-a1ce-4fb8-9da8-1fba91c1cb02",
					day: 10,
					hour: 8,
					id: "98802b42-885a-4f81-9888-6488c66be1b6",
					minute: 30,
					month: 2,
					realmId: "34bd8c2c-354b-427a-855d-6897d91db8b2",
					type: "waituntil"
				}
			]
		};
	});

	it('should have steps after get campaign data', function() {
		var campaign = CampaignStore.onGetCampaignComplete(mockCampaignData);
		expect(campaign.steps).toBeDefined();
		expect(campaign.steps.length).toEqual(3);
	});

	it('should step is isEditing when was clicked', function() {
		var campaign = CampaignStore.onGetCampaignComplete(mockCampaignData);

		campaign = CampaignStore.onHandleDelayViewerClick(mockCampaignData.steps[2]);
		expect(campaign.steps[2].isEditing).toEqual(true);
	});

	it('should other step have isEditing property is false', function() {
		var campaign = CampaignStore.onGetCampaignComplete(mockCampaignData);
		campaign = CampaignStore.onHandleDelayViewerClick(campaign.steps[2]);
		expect(campaign.steps[2].isEditing).toEqual(true);

		campaign = CampaignStore.onHandleDelayViewerClick(campaign.steps[0]);
		expect(campaign.steps[2].isEditing).toEqual(false);
		expect(campaign.steps[0].isEditing).toEqual(true);
	});
});