

var app = angular.module('testApp', ['ngGridView']);

app.controller('textController', ['$scope', function ($scope) {

    $scope.form = {};
    $scope.form.directory = [{ "name": "Virginia Meyer", "phone": "9-(608)567-3396", "salario": "30215.36", "hire_date": "2015-04-03T13:36:09Z" },
{ "name": "Justin Mason", "phone": "9-(017)172-3417", "salario": "29899.53", "hire_date": "2015-01-31T03:35:59Z" },
{ "name": "Victor Holmes", "phone": "7-(433)515-3103", "salario": "20975.06", "hire_date": "2014-10-09T05:11:55Z" },
{ "name": "Judith Oliver", "phone": "6-(266)237-2602", "salario": "26838.78", "hire_date": "2015-07-25T17:01:15Z" },
{ "name": "Laura Griffin", "phone": "8-(581)078-9016", "salario": "23117.18", "hire_date": "2015-08-11T00:58:09Z" },
{ "name": "Robin Nichols", "phone": "5-(503)494-3995", "salario": "27533.73", "hire_date": "2015-03-01T10:51:16Z" },
{ "name": "Raymond Palmer", "phone": "6-(592)992-5378", "salario": "2436.10", "hire_date": "2015-02-08T20:08:32Z" },
{ "name": "Willie Spencer", "phone": "3-(902)425-3742", "salario": "39363.67", "hire_date": "2015-01-04T21:17:27Z" },
{ "name": "Janice Arnold", "phone": "4-(007)703-2782", "salario": "11567.40", "hire_date": "2015-04-12T05:06:21Z" },
{ "name": "Benjamin Wood", "phone": "7-(441)708-5113", "salario": "10149.74", "hire_date": "2015-09-01T23:37:49Z" },
{ "name": "Jose Tucker", "phone": "1-(233)211-1343", "salario": "39583.45", "hire_date": "2015-05-09T19:29:56Z" },
{ "name": "Phillip Gardner", "phone": "0-(851)201-2343", "salario": "14616.78", "hire_date": "2015-05-17T20:22:54Z" },
{ "name": "Terry Wheeler", "phone": "9-(266)702-6294", "salario": "13453.15", "hire_date": "2015-03-21T16:02:16Z" },
{ "name": "Debra Sims", "phone": "7-(764)289-9316", "salario": "22256.41", "hire_date": "2015-02-10T11:52:23Z" },
{ "name": "Cynthia Bennett", "phone": "6-(183)055-6045", "salario": "18063.93", "hire_date": "2014-12-29T02:17:06Z" },
{ "name": "Howard Rogers", "phone": "5-(025)070-6923", "salario": "16727.76", "hire_date": "2014-10-23T09:15:04Z" },
{ "name": "Janet Welch", "phone": "1-(651)899-1377", "salario": "27515.86", "hire_date": "2015-02-25T21:44:13Z" },
{ "name": "Jennifer Howell", "phone": "3-(837)899-8341", "salario": "28024.23", "hire_date": "2015-04-29T11:30:19Z" },
{ "name": "Doris Payne", "phone": "7-(791)862-4499", "salario": "34122.73", "hire_date": "2015-02-10T16:22:15Z" },
{ "name": "Billy Thomas", "phone": "4-(026)135-5412", "salario": "32969.81", "hire_date": "2014-12-02T06:47:36Z" },
{ "name": "Lillian Griffin", "phone": "3-(959)107-1182", "salario": "4958.30", "hire_date": "2014-10-15T03:21:29Z" },
{ "name": "Kathy Kennedy", "phone": "1-(278)695-8013", "salario": "37543.61", "hire_date": "2015-04-12T10:11:07Z" },
{ "name": "Jean Carroll", "salario": "662.92" },
{ "name": "Kenneth Weaver", "phone": "1-(676)451-9669", "salario": "34004.71", "hire_date": "2015-08-28T17:05:52Z" },
{ "name": "Paula Daniels", "phone": "5-(266)888-8949", "salario": "25064.98", "hire_date": "2015-09-22T20:08:20Z" },
{ "name": "Jessica Spencer", "phone": "5-(389)270-5044", "salario": "34227.86", "hire_date": "2014-11-23T10:09:34Z" },
{ "name": "Kenneth Gordon", "phone": "9-(689)662-4665", "salario": "23872.42", "hire_date": "2015-05-05T02:20:51Z" },
{ "name": "Doris Peterson", "phone": "8-(182)625-6191", "salario": "31832.38", "hire_date": "2015-04-18T20:51:53Z" },
{ "name": "Steve Gutierrez", "phone": "5-(576)071-9949", "salario": "14262.17", "hire_date": "2015-04-23T14:40:23Z" },
{ "name": "Harry Pierce", "phone": "2-(632)164-0134", "salario": "9537.80", "hire_date": "2015-02-09T19:59:45Z" },
{ "name": "Judith Thomas", "phone": "6-(337)223-8356", "salario": "37331.26", "hire_date": "2015-04-02T17:45:13Z" },
{ "phone": "0-(266)077-0396", "hire_date": "2015-02-07T11:13:58Z" },
{ "name": "Phyllis Myers", "phone": "8-(420)249-6920", "salario": "5423.55", "hire_date": "2015-05-26T12:33:43Z" },
{ "name": "William Rice", "phone": "7-(826)809-5293", "salario": "20633.26", "hire_date": "2015-01-19T02:04:54Z" },
{ "name": "Debra Williams", "phone": "2-(559)924-7404", "salario": "8953.25", "hire_date": "2015-05-26T22:27:46Z" },
{ "name": "Evelyn Taylor", "phone": "4-(581)959-3613", "salario": "26575.98", "hire_date": "2015-02-28T05:52:15Z" },
{ "name": "Billy Richardson", "phone": "9-(723)618-3055", "salario": "23788.71", "hire_date": "2015-06-10T21:56:07Z" },
{ "name": "Louise Patterson", "phone": "7-(366)166-9223", "salario": "15064.16", "hire_date": "2014-10-19T19:33:08Z" },
{ "name": "Ralph Hawkins", "phone": "7-(636)888-1488", "salario": "27403.03", "hire_date": "2015-06-11T02:18:40Z" },
{ "name": "Eric Ferguson", "phone": "7-(221)442-5855", "salario": "21289.83", "hire_date": "2015-07-04T08:54:46Z" },
{},
{ "name": "Elizabeth Rogers", "phone": "5-(942)700-5903", "salario": "1927.45", "hire_date": "2015-01-18T05:31:19Z" },
{ "name": "Keith Davis", "phone": "6-(627)062-9849", "salario": "4979.20", "hire_date": "2015-03-13T16:07:25Z" },
{ "name": "Melissa Hayes", "phone": "3-(404)644-4907", "salario": "8023.51", "hire_date": "2015-08-20T13:43:57Z" },
{ "name": "Aaron Patterson", "phone": "9-(232)838-1651", "salario": "34937.31", "hire_date": "2014-10-08T09:56:28Z" },
{ "name": "Annie Gardner", "phone": "7-(630)577-9547", "salario": "24321.55", "hire_date": "2015-07-13T07:34:51Z" },
{ "name": "Ronald West", "phone": "3-(326)323-6793", "salario": "37568.04", "hire_date": "2015-03-29T09:50:00Z" },
{ "name": "Linda Marshall", "phone": "5-(934)244-5649", "salario": "36186.08", "hire_date": "2015-04-28T16:15:00Z" },
{ "name": "Joyce Gray", "phone": "9-(907)359-1792", "salario": "14038.07", "hire_date": "2015-05-08T22:27:21Z" },
{ "name": "Mary Stone", "phone": "6-(757)640-0183", "salario": "5488.68", "hire_date": "2015-06-26T21:08:44Z" },
{ "name": "Roy Morris", "phone": "8-(900)069-8718", "salario": "19841.78", "hire_date": "2015-07-26T04:10:39Z" },
{ "name": "Robin Bailey", "phone": "1-(648)843-5325", "salario": "32614.82", "hire_date": "2015-02-15T03:18:54Z" },
{ "name": "Gregory Gilbert", "phone": "0-(820)919-1298", "salario": "11997.32", "hire_date": "2015-06-05T06:27:15Z" },
{ "name": "Ruby Thompson", "phone": "8-(203)103-6048", "salario": "12361.74", "hire_date": "2015-01-23T23:45:31Z" },
{ "name": "Donald Duncan", "phone": "4-(306)627-1274", "salario": "6465.80", "hire_date": "2014-12-08T01:39:05Z" },
{ "name": "Frances Coleman", "phone": "6-(546)406-7144", "salario": "28207.78", "hire_date": "2015-04-04T10:47:12Z" },
{ "name": "Timothy Porter", "phone": "0-(468)571-3458", "salario": "8145.86", "hire_date": "2014-12-22T23:12:08Z" },
{ "phone": "7-(941)758-7782", "hire_date": "2014-12-13T08:40:56Z" },
{ "name": "Andrea Watkins", "phone": "7-(357)897-5690", "salario": "18814.46", "hire_date": "2015-08-29T21:02:05Z" },
{ "name": "Lori Vasquez", "phone": "7-(713)128-3412", "salario": "7798.76", "hire_date": "2015-06-08T15:51:15Z" },
{ "name": "Michael Lawson", "phone": "4-(666)157-5604", "salario": "12838.40", "hire_date": "2015-05-09T08:56:44Z" },
{ "name": "Fred Mills", "phone": "0-(075)377-2244", "salario": "6425.63", "hire_date": "2015-08-25T21:59:39Z" },
{ "name": "Charles Henry", "phone": "4-(506)221-0919", "salario": "39627.82", "hire_date": "2015-06-29T08:44:00Z" },
{ "name": "Roy Mccoy", "phone": "4-(113)137-6335", "salario": "19703.75", "hire_date": "2014-12-29T19:58:42Z" },
{ "name": "Phyllis Peterson", "phone": "3-(838)065-6263", "salario": "35652.64", "hire_date": "2014-10-26T11:10:07Z" },
{ "name": "Tina Bryant", "phone": "0-(137)955-3793", "salario": "35961.17", "hire_date": "2014-11-01T19:20:00Z" },
{ "name": "Nicholas Kelly", "phone": "9-(938)842-4960", "salario": "15581.49", "hire_date": "2015-04-05T23:39:07Z" },
{ "name": "Anne Ward", "phone": "0-(131)114-4850", "salario": "13814.12", "hire_date": "2015-02-25T09:52:15Z" },
{ "name": "Edward Burton", "phone": "1-(890)856-4376", "salario": "2207.88", "hire_date": "2015-01-06T23:16:33Z" },
{ "name": "Larry Turner", "phone": "9-(106)568-4852", "salario": "26454.10", "hire_date": "2015-01-19T02:04:49Z" },
{ "name": "Phyllis Peterson", "phone": "5-(825)723-2911", "salario": "10498.24", "hire_date": "2014-11-14T10:24:55Z" },
{ "name": "Stephen Watkins", "phone": "6-(977)956-3867", "salario": "17907.39", "hire_date": "2014-11-10T19:23:00Z" },
{ "name": "Justin Perez", "phone": "1-(682)817-5589", "salario": "30400.40", "hire_date": "2015-02-02T22:26:27Z" },
{ "name": "Patricia Hart", "phone": "0-(068)377-4592", "salario": "16384.09", "hire_date": "2015-04-09T14:22:29Z" },
{ "name": "Brandon Sanchez", "phone": "4-(186)853-8437", "salario": "19824.93", "hire_date": "2014-12-12T16:00:53Z" },
{ "name": "Jimmy Wright", "phone": "5-(152)387-0240", "salario": "31391.15", "hire_date": "2014-11-05T02:07:14Z" },
{ "name": "Louise Hanson", "phone": "0-(725)474-3827", "salario": "25942.21", "hire_date": "2015-04-11T18:21:46Z" },
{ "name": "Evelyn Wagner", "phone": "1-(132)368-2793", "salario": "8222.32", "hire_date": "2014-10-23T20:58:14Z" },
{ "name": "Tammy Baker", "phone": "9-(075)201-7925", "salario": "2944.36", "hire_date": "2014-11-28T13:24:28Z" },
{ "name": "Aaron Watkins", "phone": "4-(547)044-3240", "salario": "2379.72", "hire_date": "2014-12-17T21:42:14Z" },
{ "name": "Terry Garrett", "phone": "4-(747)924-2846", "salario": "26000.78", "hire_date": "2014-12-10T02:38:22Z" },
{ "name": "Brian Reynolds", "phone": "4-(016)404-1768", "salario": "21092.73", "hire_date": "2015-04-29T15:14:17Z" },
{ "name": "Kathleen Schmidt", "phone": "0-(558)727-0674", "salario": "24636.68", "hire_date": "2015-06-16T13:00:45Z" },
{ "name": "Kathy Woods", "phone": "5-(224)030-2111", "salario": "16184.85", "hire_date": "2015-07-24T00:40:14Z" },
{ "name": "Edward Bailey", "phone": "9-(526)671-8027", "salario": "11770.18", "hire_date": "2014-12-04T18:10:02Z" },
{ "name": "Kathy Sullivan", "phone": "5-(053)818-3483", "salario": "36110.31", "hire_date": "2015-08-06T17:52:00Z" },
{ "name": "Thomas Thompson", "phone": "0-(048)279-7842", "salario": "9135.45", "hire_date": "2015-03-31T02:07:58Z" },
{ "name": "Roger Fields", "phone": "8-(228)798-4165", "salario": "34967.30", "hire_date": "2015-01-30T16:13:08Z" },
{ "name": "Anna Marshall", "phone": "0-(254)595-0534", "salario": "805.44", "hire_date": "2014-11-10T12:25:53Z" },
{ "name": "Jesse Harris", "phone": "5-(153)837-0151", "salario": "18135.64", "hire_date": "2014-11-13T07:14:03Z" },
{ "name": "Elizabeth Richards", "phone": "7-(369)008-4829", "salario": "21444.14", "hire_date": "2015-09-09T18:01:08Z" },
{ "name": "Jack Williamson", "phone": "4-(734)506-1513", "salario": "2604.04", "hire_date": "2015-05-01T07:22:59Z" },
{ "name": "Phyllis Peterson", "phone": "0-(152)973-5554", "salario": "972.19", "hire_date": "2015-06-27T05:07:17Z" },
{ "name": "Billy Gomez", "phone": "5-(059)663-4572", "salario": "20084.57", "hire_date": "2015-03-20T09:32:26Z" },
{ "name": "Billy Garcia", "phone": "0-(693)976-4190", "salario": "25621.86", "hire_date": "2015-09-19T07:32:17Z" },
{ "name": "Carl Edwards", "phone": "8-(197)542-7687", "salario": "35398.89", "hire_date": "2015-08-04T06:20:54Z" },
{ "name": "Ralph Castillo", "phone": "5-(413)824-1861", "salario": "39222.11", "hire_date": "2015-03-07T02:35:23Z" },
{ "name": "Theresa Barnes", "phone": "6-(619)045-7166", "salario": "37297.14", "hire_date": "2014-11-09T12:41:38Z" },
{ "name": "Marie Morales", "phone": "6-(635)337-8751", "salario": "7447.42", "hire_date": "2015-03-16T07:48:45Z" },
{ "name": "Jimmy Franklin", "phone": "7-(420)446-6356", "salario": "5111.28", "hire_date": "2015-07-14T21:44:38Z" }]
   

    $scope.pruebame = function (row) {
        alert('empleado: ' + row.name + ' Salario: ' + row.salario + ' se contrato en: '  + row.hire_date);
    }

    $scope.addValue = function () {
        //$scope.form.directory.push({name: 'prueba2', phone: '12345679'})
        console.log($scope);
    }

    $scope.addPage = function () {
        $scope.gvCurrentPage++;
    }

    $scope.removePage = function () {
        $scope.gvCurrentPage--;
    }

    $scope.parseFloat = function (value) {
        return parseFloat(value);
    }

    $scope.procesar = function (name) {
        return 'procesado el nombre de ' + name;
    }
}]);