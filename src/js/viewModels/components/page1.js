define(['knockout', 'ojs/ojinputtext'],
    function (ko) {
        var viewModel = function (params) {
            var self = this;
            var userInfoSignal = params.userInfoSignal;
            self.userName = ko.observable();
            self.userCity = ko.observable();
            self.userState = ko.observable();
            ko.computed(function () {
                userInfoSignal.dispatch(self.userName(), self.userCity(), self.userState());
            });
        }
        return viewModel;
    }
);